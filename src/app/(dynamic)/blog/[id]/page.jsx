import Image from "next/image";  
import Link from "next/link";  
import Balancer from "react-wrap-balancer";  

// وظيفة لإعداد بيانات الميتاداتا
export async function generateMetadata({ params }) {
  const { id } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API}wp-json/wp/v2/posts/${id}`);
  const post = await response.json();

  // استدعاء بيانات الميديا المميزة
  const mediaResponse = post.featured_media ? await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API}wp-json/wp/v2/media/${post.featured_media}`) : null;
  const media = mediaResponse ? await mediaResponse.json() : null;

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/(<([^>]+)>)/gi, ''), // إزالة العلامات HTML للحصول على وصف نظيف
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/(<([^>]+)>)/gi, ''),
      images: media ? [{ url: media.source_url, alt: media.alt_text || post.title.rendered }] : [],
    },
  };
}


const PostDetail = async ({ params }) => {  
  const { id } = params; // افترضنا أن سيأتي المعرف من الرابط  
  const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API}wp-json/wp/v2/posts/${id}`);  
  const post = await response.json();   

  // استدعاء بيانات الميديا المميزة  
  const mediaResponse = post.featured_media ?   
    await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API}wp-json/wp/v2/media/${post.featured_media}`) :   
    null;  

  const media = mediaResponse ? await mediaResponse.json() : null;   

  return (  
    <div className="container mx-auto px-4">  
      <h1>  
        <Balancer>  
          <span dangerouslySetInnerHTML={{ __html: post.title.rendered }}></span>  
        </Balancer>  
      </h1>  

      <div className="flex justify-between items-center gap-4 text-sm mb-4">  
        <h5>  
          Published {new Date(post.date).toLocaleDateString()} by{" "}  
          {post.author && (  
            <span>  
              <a href={`/posts/?author=${post.author}`}>{post.author}</a>{" "}  
            </span>  
          )}  
        </h5>  
        {post.categories && post.categories.map((category) => (  
          <Link  
            href={`/posts/?category=${category.id}`}  
            key={category.id}  
            className="not-prose border border-blue-500"  
          >  
            {category.name}  
          </Link>  
        ))}  
      </div>  

      <div className="relative overflow-hidden bg-cover bg-no-repeat" data-twe-ripple-init data-twe-ripple-color="light">  
        <div className="w-full overflow-hidden relative rounded-md flex items-center justify-center">  
          {media ? (  
            <Image  
              src={media.source_url}  
              width={290}  
              height={300}  
              className="rounded"  
              alt={media.alt_text || post.title.rendered}  
            />  
          ) : (  
            <div className="h-full w-full flex items-center justify-center bg-gray-200">  
              <p>No image available</p>  
            </div>  
          )}  
        </div>  
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />  
      </div>  
    </div>  
  );  
};  

export default PostDetail;