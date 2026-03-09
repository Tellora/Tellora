export const metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default function InstagramPreviewIndex() {
    // just return 404 or redirect to home to avoid exposing anything
    return <p className="p-8 text-center text-gray-600">Invalid URL</p>;
}
