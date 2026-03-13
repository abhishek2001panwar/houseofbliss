import { BLOGS } from "@/lib/data";
import Image from "next/image";

export default async function Page({ params }) {

  const resolvedParams = await params;
    const { id } = await params;

  const blog = BLOGS.find((b) => b.id === Number(resolvedParams.id));

  if (!blog) {
    return <div className="p-10">Blog not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-light font-editorial mb-6">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-10 font-">
        {blog.desc}
      </p>

      <Image
        src={blog.img}
        alt={blog.title}
        width={1200}
        height={700}
        className="mb-10 w-full object-cover"
      />

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

    </div>
  );
}