import React from "react";

interface PageProps {
    params: { slug: string };
}

export const metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function PreviewPage({ params }: PageProps) {
    let profile = null;
    try {
        const res = await fetch(`http://localhost:3000/api/ig/profiles/${params.slug}`, { cache: 'no-store' });
        if (res.ok) {
            profile = await res.json();
        }
    } catch (err) {
        // ignore
    }

    if (!profile) {
        return <p className="p-8 text-center text-white">Profile not found</p>;
    }

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen">
            <style>{`/* simple :target-based lightbox */
                .post-overlay { display: none; }
                .post-overlay:target { display: block; }
            `}</style>
            <header className="p-4 border-b">
                <div className="flex items-center gap-4">
                    {profile.profilePic && (
                        <img src={profile.profilePic} className="w-12 h-12 rounded-full object-cover" alt="" />
                    )}
                    <div>
                        <h1 className="text-lg font-semibold">{profile.name}</h1>
                        {profile.bio && <p className="text-sm text-gray-600">{profile.bio}</p>}
                    </div>
                </div>
            </header>
            <main>
                <div className="grid grid-cols-3 gap-1">
                    {profile.posts.map((post: any) => (
                        <a key={post.id} href={`#${post.id}`} className="block">
                            <div className="relative w-full pb-[100%] bg-gray-200">
                                {post.type === "image" ? (
                                    <img src={post.src} className="absolute inset-0 w-full h-full object-cover" alt="" />
                                ) : (
                                    <video src={post.src} className="absolute inset-0 w-full h-full object-cover" />
                                )}
                            </div>
                        </a>
                    ))}
                </div>
                {/* captions in modal-style anchors */}
                {profile.posts.map((post: any) => (
                    <div key={post.id} id={post.id} className="post-overlay fixed inset-0 bg-black/80 text-white p-4 overflow-auto">
                        <a href="#" className="text-white text-xl font-bold absolute top-4 right-4">✕</a>
                        <div className="mt-12">
                            {post.type === "image" ? (
                                <img src={post.src} className="w-full" alt="" />
                            ) : (
                                <video src={post.src} className="w-full" controls />
                            )}
                            {post.caption && <p className="mt-4">{post.caption}</p>}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
