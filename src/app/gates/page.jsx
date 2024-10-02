"use client"
import Desktopsvg from "@/components/gates/Desktopsvg";
import GatesForm from "@/components/gates/GatesForm";
import Head from "@/components/gates/Head";
import MobileSvg from "@/components/gates/MobileSvg";
import React, { Suspense } from "react";

const Gates = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <motion.div
            className="w-16 h-16 border-8 border-t-8 border-gray-300 rounded-full animate-spin border-t-c-500"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.p
            className="mt-4 text-lg text-c-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.p>
        </div>
      }
    >
      <div
        className="pb-10 mx-auto bg-c-0 md:pb-5 max-w-7xl"
        style={{ position: "relative" }}
      >
        <div>
          <Head />
          <MobileSvg />
          <div className="grid grid-cols-2 pt-0 pb-6 contain md:pt-4">
            <Desktopsvg />
            <GatesForm />
          </div>{" "}
          <div className="mb-14">
            <div />
            <a href="/gallery">
              <button
                className="shadow-btn mx-auto mb-4 rounded-full border-[3px] border-green-600 bg-c-green px-8 py-2 text-3xl font-bold text-c-0 transition-colors active:bg-green-600 md:hover:bg-green-600"
                type="button"
                style={{ textShadow: "0 0 2px #353" }}
              >
                View Full Gallery
              </button>
            </a>{" "}
            <div className="px-3 mx-auto md:w-1/2">
              <div className="mb-5">
                <div className="text-4xl font-bold uppercase mt-7">
                  Description
                </div>{" "}
                <span className="text-center contain-marker indent-6 md:text-left">
                  <div className="marker">
                    <p>
                      <strong>
                        Every StandardGates&apos; gate is first custom designed
                        by you
                      </strong>
                      , and then our team of experienced ironworkers will use
                      heavy duty steel to handcraft it to the highest industry
                      standards. Your gate will be American made, thoroughly
                      cleaned and then finished with a thick layer of protective
                      anti-gassing primer and black satin powder-coat. Next your
                      gate will be reinspected for quality and then shipped FOR
                      FREE * directly to your home; ready to be installed using
                      our famous Do It Yourself (DIY) Gate Installation system.{" "}
                      <strong>
                        Remember to always safely enjoy your gate installation
                        in the sunshine and with a suitable partner.
                      </strong>{" "}
                      Call us anytime if you have questions during the
                      installation or ordering process.
                    </p>
                  </div>
                </span>
              </div>{" "}
              <hr />{" "}
              <div className="mb-3">
                <div className="text-4xl font-bold uppercase mt-7">
                  Features
                </div>{" "}
                <span className="list-none contain-marker">
                  <li className="pb-2">
                    <div className="marker">
                      <p>
                        <strong>Gate</strong> | <strong>Finish:</strong> Thick
                        satin black powder-coat with an enviromentally friendly
                        rust preventing anti-gassing primer under-coat.
                      </p>
                    </div>
                  </li>
                  <li className="pb-2">
                    <div className="marker">
                      <p>
                        <strong>Width</strong> | <strong>Size:</strong> If the
                        size you need isn&apos;t shown, let us know. Unless
                        requested otherwise, all gates are 6ft tall when set on
                        v-track (slide) or 2 inches above the ground (swing).
                      </p>
                    </div>
                  </li>
                  <li className="pb-2">
                    <div className="marker">
                      <p>
                        <strong>Kit</strong> | <strong>Swing:</strong> Includes
                        heavy duty hinges and 4x4 94 inch heavy/regular posts
                        with caps. Swings open over 180 degrees without
                        automation.
                      </p>
                    </div>
                  </li>
                  <li className="pb-2">
                    <div className="marker">
                      <p>
                        <strong>Panels</strong> | <strong>Solo:</strong> Gate
                        opens from the side. 10ft+ wide panels ship in 2 bolt
                        connectable sections.
                      </p>
                    </div>
                  </li>
                  <li className="pb-2">
                    <div className="marker">
                      <p>
                        <strong>Style</strong> | <strong>Both:</strong>{" "}
                        There&apos;s nothing more stylish than an arch with
                        finials.
                      </p>
                    </div>
                  </li>
                  <li className="pb-2">
                    <div className="marker">
                      <p>
                        <strong>Pickets</strong> | <strong>Single:</strong>{" "}
                        Thick round steel tubing set 4 inches apart.
                      </p>
                    </div>
                  </li>
                  <li className="pb-2">
                    <div className="marker">
                      <p>
                        <strong>Ironwood</strong> | <strong>DIY:</strong> Do it
                        yourself. Perfect if you plan on adding your own wood.
                      </p>
                    </div>
                  </li>
                  <li className="pb-2">
                    <div className="marker">
                      <p>
                        <strong>Access</strong> | <strong>Manual:</strong> Comes
                        with large gate cane bolt(s) and/or a gate latch
                        depending on the type of gate you&apos;re ordering
                      </p>
                    </div>
                  </li>
                </span>
              </div>{" "}
              <hr />{" "}
              <div className="mb-5">
                <div className="text-4xl font-bold uppercase mt-7">
                  Free Shipping *
                </div>{" "}
                <span className="text-center contain-marker indent-6 md:text-left">
                  <div className="marker">
                    <p>
                      For orders of gates/fences to be shipped to Alaska and
                      Hawaii, a flat rate of $750 ($1250 for LTL over-length
                      shipments) will be applied. Shipping to other states
                      within the US is complimentary. When ordering a
                      gate/fence, accessories/parts will also be shipped at no
                      additional cost. Delivery of your order is typically
                      expected to arrive within 3-5 business days, though there
                      may be instances where it takes longer. The freight
                      dispatch team will contact you on the day of delivery.
                      Please be advised that it is your responsibility to unload
                      your products safely and with assistance. If you require
                      the use of the freight truck&apos;s lift-gate, an
                      additional fee of $85 will apply. It is important to
                      carefully inspect your shipment for any concealed damages
                      and missing items before signing the proof of delivery
                      slip. Failure to do so may result in you being held
                      responsible for any replacements or repairs needed.
                    </p>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <iframe
          style={{
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            border: 0,
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1,
          }}
          aria-hidden="true"
          tabIndex={-1}
          src="about:blank"
        />
      </div>
    </Suspense>
  );
};

export default Gates;
