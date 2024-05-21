const Footer = () => {
  // const footerNavs = [
  //   {
  //     href: "javascript:void()",
  //     name: "About",
  //   },
  //   {
  //     href: "javascript:void()",
  //     name: "Blog",
  //   },
  //   {
  //     href: "javascript:void()",
  //     name: "",
  //   },
  //   {
  //     href: "javascript:void()",
  //     name: "Team",
  //   },
  //   {
  //     href: "javascript:void()",
  //     name: "Careers",
  //   },

  //   {
  //     href: "javascript:void()",
  //     name: "Support",
  //   },
  // ];

  return (
    <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        {/* TODO: Replace with our logo */}
        <img
          src="https://www.floatui.com/logo.svg"
          className="w-32 sm:mx-auto"
        />
        {/* <p className="leading-relaxed mt-2 text-[15px]">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </p> */}
      </div>
      {/* <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li className=" hover:text-gray-800">
            <a key={idx} href={item.href}>
              {item.name}
            </a>
          </li>
        ))}
      </ul> */}
      <div className="mt-8">
        <div className="mt-4 sm:mt-0">
          &copy; 2024 KipTrak All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
