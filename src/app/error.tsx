'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h1>
            <p className="text-lg text-gray-700 mb-6">{error.message}</p>
            <button
                onClick={reset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Try again
            </button>
        </div>
    );
}