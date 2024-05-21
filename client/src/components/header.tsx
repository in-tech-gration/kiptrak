const Header = () => {
  return (
    <header>
      <nav className="bg-white w-full border-b md:border-0 md:static">
        <div className="items-center justify-between px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="javascript:void(0)">
              {/* TODO: Replace with our logo */}
              <img
                src="https://www.floatui.com/logo.svg"
                width={120}
                height={50}
                alt="Float UI logo"
              />
            </a>
          </div>
          <div className="hidden md:inline-block">
            <a
              href="javascript:void(0)"
              className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow"
            >
              Log In
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
