import React from 'react'

const Footer = () => {
  return (
    <footer
      className="bg-c-0 relative z-[5] min-h-[250px] print:hidden"
      style={{ backgroundColor: "#fff00" }}
    >
      <div>
        <div className="mt-16" style={{}}>
          <div className="-mt-40 overflow-hidden pointer-events-none">
            <svg
              className="ml-[-5%] h-24 w-[110%]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M600 115 L0 0 0 120 1200 120 1200 0 600 115z"
                className="fill-current text-c-100"
              />
            </svg>
          </div>{" "}
          <div className="-mt-0.5 bg-c-100 text-c-600">
            <div className="grid grid-cols-2 pt-3 -mb-1 text-center md:mb-3 md:grid-cols-5">
              <div className="px-0.5">
                <h2 className="mb-3 font-medium tracking-widest uppercase text-c-900">
                  Shop SG
                </h2>{" "}
                <nav className="mb-10 list-none">
                  <li>
                    <a
                      href="/listing/gate"
                      className="text-c-600 hover:text-c-800"
                    >
                      Gates
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/listing/fence"
                      className="text-c-600 hover:text-c-800"
                    >
                      Fences
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/category/access"
                      className="text-c-600 hover:text-c-800"
                    >
                      Extras
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/category/parts"
                      className="text-c-600 hover:text-c-800"
                    >
                      Parts
                    </a>{" "}
                  </li>
                </nav>
              </div>{" "}
              <div className="px-0.5">
                <h2 className="mb-3 font-medium tracking-widest uppercase text-c-900">
                  About Us
                </h2>{" "}
                <nav className="mb-10 list-none">
                  <li>
                    <a
                      href="/about/faq"
                      className="text-c-600 hover:text-c-800"
                    >
                      FAQ
                    </a>{" "}
                  </li>
                  <li>
                    <a href="/gallery" className="text-c-600 hover:text-c-800">
                      Gallery
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/coming-soon"
                      className="text-c-600 hover:text-c-800"
                    >
                      Our Story
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/coming-soon"
                      className="text-c-600 hover:text-c-800"
                    >
                      Careers
                    </a>{" "}
                  </li>
                </nav>
              </div>{" "}
              <div className="hidden my-4 md:block">
                <picture>
                  <source
                    srcSet="https://firebasestorage.googleapis.com/v0/b/standardgates-222619.appspot.com/o/logos%2Fsquare.avif?alt=media"
                    type="image/avif"
                  />{" "}
                  <source
                    srcSet="https://firebasestorage.googleapis.com/v0/b/standardgates-222619.appspot.com/o/logos%2Fsquare.webp?alt=media"
                    type="image/webp"
                  />{" "}
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/standardgates-222619.appspot.com/o/logos%2Fsquare.png?alt=media"
                    alt="Logo"
                    loading="eager"
                    decoding="async"
                    className="rounded transition-all duration-300 !opacity-100"
                  />
                </picture>{" "}
              </div>{" "}
              <div className="px-0.5">
                <h2 className="mb-3 font-medium tracking-widest uppercase text-c-900">
                  Satisfaction
                </h2>{" "}
                <nav className="mb-10 list-none">
                  <li>
                    <a
                      href="/agreements/sales-terms"
                      className="text-c-600 hover:text-c-800"
                    >
                      Sales Terms
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/agreements/sales-terms#returns"
                      className="text-c-600 hover:text-c-800"
                    >
                      Satisfaction Guarantee
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/agreements/sales-terms#shipping"
                      className="text-c-600 hover:text-c-800"
                    >
                      Shipping Policy
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/agreements/sales-terms#returns"
                      className="text-c-600 hover:text-c-800"
                    >
                      Return Policy
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/agreements/sales-terms#warranty"
                      className="text-c-600 hover:text-c-800"
                    >
                      Warranty
                    </a>{" "}
                  </li>
                </nav>
              </div>{" "}
              <div className="px-0.5">
                <h2 className="mb-3 font-medium tracking-widest uppercase text-c-900">
                  Legal
                </h2>{" "}
                <nav className="mb-10 list-none">
                  <li>
                    <a
                      href="/agreements/terms-and-conditions"
                      className="text-c-600 hover:text-c-800"
                    >
                      Terms &amp; Conditions
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/agreements/privacy-policy"
                      className="text-c-600 hover:text-c-800"
                    >
                      Privacy Policy
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/agreements/cookie-policy"
                      className="text-c-600 hover:text-c-800"
                    >
                      Cookie Policy
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="/agreements/prop-65"
                      className="text-c-600 hover:text-c-800"
                    >
                      Prop 65
                    </a>{" "}
                  </li>
                </nav>
              </div>{" "}
              <div className="col-span-2 md:col-span-5">
                {" "}
                <div className="my-4">
                  <div className="pb-1 text-3xl font-bold uppercase text-c-900 md:mt-4">
                    <span className="text-4xl">S</span>tandard
                    <span className="text-4xl">G</span>ates
                    <span className="text-sm align-text-top">™</span>
                  </div>{" "}
                  <div className="text-lg font-semibold text-c-1000">
                    Help Center
                  </div>{" "}
                  <a
                    className="hover:text-c-prime"
                    href="mailto:support@standardgates.com"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      className="mt-[-2px] inline-block h-5 w-5 text-lg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>{" "}
                    | Support@StandardGates.com
                  </a>{" "}
                  <br />{" "}
                  <a
                    className="hover:text-c-prime"
                    href="https://www.google.com/maps/place/23+Las+Colinas+Ln+%23110,+San+Jose,+CA+95119/"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      className="mt-[-2px] inline-block h-5 w-5 text-lg font-medium"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>{" "}
                    | 23 Las Colinas Ln #110
                    <br />
                    San Jose, CA 95119
                  </a>{" "}
                  <br />{" "}
                  <a className="hover:text-c-prime" href="tel:800-879-8793">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      className="mt-[-2px] inline-block h-5 w-5 text-lg"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>{" "}
                    | (800) 879-8793
                  </a>
                </div>
              </div>{" "}
              <div className="col-span-2 mt-40 -mb-16 md:hidden">
                <div className="-mt-40 overflow-hidden pointer-events-none">
                  <svg
                    className="ml-[-5%] h-24 w-[110%]"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M600 115 L0 0 0 120 1200 120 1200 0 600 115z"
                      className="fill-current text-c-1000"
                    />
                  </svg>
                </div>
              </div>{" "}
              <div className="block col-span-2 bg-c-1000 md:hidden">
                <picture>
                  <source
                    srcSet="https://firebasestorage.googleapis.com/v0/b/standardgates-222619.appspot.com/o/logos%2Fsquare.avif?alt=media"
                    type="image/avif"
                  />{" "}
                  <source
                    srcSet="https://firebasestorage.googleapis.com/v0/b/standardgates-222619.appspot.com/o/logos%2Fsquare.webp?alt=media"
                    type="image/webp"
                  />{" "}
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/standardgates-222619.appspot.com/o/logos%2Fsquare.png?alt=media"
                    alt="Logo"
                    loading="eager"
                    decoding="async"
                    className="mx-auto rounded transition-all duration-300 !opacity-100"
                  />
                </picture>{" "}
              </div>
            </div>{" "}
            <div className="pb-16 -mt-3 text-sm bg-c-1000 text-c-500 md:bg-c-100 md:pb-4">
              This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">
                Privacy Policy
              </a>{" "}
              and
              <a href="https://policies.google.com/terms">
                Terms of Service
              </a>{" "}
              apply.
            </div>{" "}
            <div className="-mt-16 bg-c-1000 md:bg-c-0 text-c-prime md:text-c-900 md:mt-0">
              <div className="flex flex-col flex-wrap-reverse px-5 pt-2 pb-3 mx-auto sm:flex-row-reverse sm:pt-4 md:pb-4">
                <span className="inline-flex justify-between px-6 mt-3 -mb-1 sm:ml-auto sm:mt-0 sm:p-0">
                  <a className="" href="https://facebook.com/StandardGates/">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-8 h-8 md:h-5 md:w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>{" "}
                  <a className="ml-3" href="https://twitter.com/StandardGates/">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-8 h-8 md:h-5 md:w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>{" "}
                  <a
                    className="ml-3"
                    href="https://instagram.com/StandardGates/"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-8 h-8 md:h-5 md:w-5"
                      viewBox="0 0 24 24"
                    >
                      <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                    </svg>
                  </a>{" "}
                  <a
                    className="ml-3"
                    href="https://www.linkedin.com/company/standardgates/"
                  >
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0}
                      className="w-8 h-8 md:h-5 md:w-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="none"
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                      />
                      <circle cx={4} cy={4} r={2} stroke="none" />
                    </svg>
                  </a>
                </span>{" "}
                <p className="pt-8 pb-2 text-sm font-semibold text-center md:text-c-900 text-c-0 md:pt-0 md:pb-0 md:font-normal">
                  © 2024 StandardGates, Inc. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer