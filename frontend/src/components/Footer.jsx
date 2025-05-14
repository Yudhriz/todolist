import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
              TaskMaster Pro
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>
              The ultimate task management solution for professionals who demand
              the best.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              >
                <i className='fa-brands fa-twitter text-xl'></i>
                <span className='sr-only'>Twitter</span>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              >
                <i className='fa-brands fa-facebook text-xl'></i>
                <span className='sr-only'>Facebook</span>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              >
                <i className='fa-brands fa-instagram text-xl'></i>
                <span className='sr-only'>Instagram</span>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              >
                <i className='fa-brands fa-github text-xl'></i>
                <span className='sr-only'>GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
              Product
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
              Resources
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
              Company
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-600 dark:text-gray-300 text-sm'>
            &copy; {new Date().getFullYear()} TaskMaster Pro. All rights
            reserved.
          </p>
          <div className='mt-4 md:mt-0'>
            <ul className='flex space-x-6'>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm'
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
