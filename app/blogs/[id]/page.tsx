import { BLOGS } from "@/lib/data";
import Image from "next/image";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const blog = BLOGS.find((b) => b.id === Number(id));

  if (!blog) {
    return <div className="p-10">Blog not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">

      <h1 className="text-5xl md:text-6xl font-editorial mb-10">
        {blog.title}
      </h1>

      

      <Image
        src={blog.img}
        alt={blog.title}
        width={1200}
        height={700}
        className="mb-10 w-full object-cover"
      />

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
      />

    </div>
  );
}