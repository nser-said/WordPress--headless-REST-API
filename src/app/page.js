import Image from "next/image";

export default function Home() {
  return (
<div>
<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 m-10">
  <div >
  <a href="#" className="block">
  <img
    alt=""
    src=" /images/2.png  "
    className="h-64 w-full object-cover sm:h-80 lg:h-96"
  />

</a>
  </div>
  <div className="p-6  dark:text-white ">
          <h5 className="mb-2 text-xl font-medium leading-tight text-green-500 ">Next.js 14</h5>
          <p className="mb-4 text-base">
           
Next.js is a powerful framework for building web applications using React, 
offering a range of features that enhance both development and performance. 
One of its key features is dynamic routing, 
allowing developers to create pages easily through a directory structure. 
Next.js also supports static generation, 
which enables the creation of static pages at build time for faster site performance. 
Additionally, it provides server-side rendering,
 ensuring that content can be rendered on the server for each request, 
 which is beneficial for search engine optimization. The framework includes API routes,
  allowing developers to create APIs directly within their Next.js applications.
   With built-in performance optimizations, such as code splitting and lazy loading, 
   Next.js improves load times and user experience. Furthermore,
    it easily integrates with various content management systems, 
    including headless CMS options. As of my last knowledge update in October 2023,
     Next.js continues to evolve, and for the latest features and updates, 
  it’s advisable to check the official Next.js website or their official social media channels.


          </p>
          <button type="button" className="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong" data-twe-ripple-init data-twe-ripple-color="light">
            Button
          </button>
        </div>



          
  </div>

</div>



  );
}
