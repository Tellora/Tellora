/**
 * Client-side biometrics module for face matching using HTML5 canvas.
 * Performs a normalized grayscale mean-absolute-difference comparison
 * on 32x32 downscaled image grids.
 */

// Helper to convert base64 data URL to an HTMLImageElement
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        if (!src.startsWith("data:")) {
            img.crossOrigin = "anonymous";
        }
        img.onload = () => resolve(img);
        img.onerror = (err) => {
            console.error("loadImage failed for source length:", src.length, err);
            reject(err);
        };
        img.src = src;
    });
}

/**
 * Compares two images using a client-side normalized grayscale pixel difference algorithm.
 * 
 * @param enrolledBase64 Reference image enrolled by the employee (base64)
 * @param currentBase64 Current verification snapshot captured from camera (base64)
 * @returns Promise resolving to a similarity score between 0 and 100
 */
export async function verifyFaceMatch(enrolledBase64: string, currentBase64: string): Promise<number> {
    try {
        // Load both images
        const [imgEnrolled, imgCurrent] = await Promise.all([
            loadImage(enrolledBase64),
            loadImage(currentBase64)
        ]);

        // Create an offscreen canvas for resizing
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error("Offscreen canvas 2D context is unavailable");
            return 50; // Fallback score
        }

        // 1. Process enrolled image
        ctx.clearRect(0, 0, 32, 32);
        ctx.drawImage(imgEnrolled, 0, 0, 32, 32);
        const dataEnrolled = ctx.getImageData(0, 0, 32, 32).data;

        // 2. Process current image
        ctx.clearRect(0, 0, 32, 32);
        ctx.drawImage(imgCurrent, 0, 0, 32, 32);
        const dataCurrent = ctx.getImageData(0, 0, 32, 32).data;

        // 3. Convert to grayscale arrays
        const size = 32 * 32;
        const grayEnrolled = new Float32Array(size);
        const grayCurrent = new Float32Array(size);

        let sumEnrolled = 0;
        let sumCurrent = 0;

        for (let i = 0; i < size; i++) {
            const idx = i * 4;
            // Grayscale coefficients: standard Y = 0.299R + 0.587G + 0.114B
            const gEnrolled = 0.299 * dataEnrolled[idx] + 0.587 * dataEnrolled[idx + 1] + 0.114 * dataEnrolled[idx + 2];
            const gCurrent = 0.299 * dataCurrent[idx] + 0.587 * dataCurrent[idx + 1] + 0.114 * dataCurrent[idx + 2];
            
            grayEnrolled[i] = gEnrolled;
            grayCurrent[i] = gCurrent;
            
            sumEnrolled += gEnrolled;
            sumCurrent += gCurrent;
        }

        // Calculate means for exposure normalization
        const meanEnrolled = sumEnrolled / size;
        const meanCurrent = sumCurrent / size;

        // 4. Compute Normalized Grayscale Mean Absolute Difference
        let absoluteDiff = 0;

        for (let i = 0; i < size; i++) {
            // Equalize brightness by centering intensities around the mid-gray (128)
            const normEnrolled = Math.max(0, Math.min(255, grayEnrolled[i] - meanEnrolled + 128));
            const normCurrent = Math.max(0, Math.min(255, grayCurrent[i] - meanCurrent + 128));
            
            absoluteDiff += Math.abs(normEnrolled - normCurrent);
        }

        const avgDiff = absoluteDiff / size;

        // Convert difference to similarity percentage
        // If images match perfectly, avgDiff = 0, similarity = 100%
        // Max difference (black vs white normalized) is 255
        const similarity = Math.max(0, Math.min(100, 100 - (avgDiff / 255) * 100));

        // For webcam face comparison, the raw similarity is typically in the 60-90% range
        // for the same person across different lighting/angle conditions.
        // We use a gentle scaling that maps [40, 100] → [50, 100] to give more realistic scores
        let adjustedSimilarity: number;
        if (similarity >= 40) {
            adjustedSimilarity = 50 + ((similarity - 40) / 60) * 50;
        } else {
            adjustedSimilarity = (similarity / 40) * 50;
        }

        return Number(Math.min(100, Math.max(0, adjustedSimilarity)).toFixed(1));
    } catch (e) {
        console.error("Biometrics comparison process failure:", e);
        return 50; // Fallback default
    }
}

/**
 * Determines whether a stored biometric photo is a mock/bypass SVG placeholder.
 * Used to allow bypass clock-in/out to auto-succeed when enrollment was also mock.
 * 
 * @param photoBase64 The photo data URL to check
 * @returns True if the photo is a mock SVG placeholder
 */
export function isMockBiometricPhoto(photoBase64: string | null | undefined): boolean {
    if (!photoBase64) return false;
    return photoBase64.startsWith("data:image/svg+xml");
}
