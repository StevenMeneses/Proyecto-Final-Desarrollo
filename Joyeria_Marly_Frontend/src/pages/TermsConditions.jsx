import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConditionsComponet from "../components/ConditionsComponet";

function TermsConditions() {
  let conditions = [
    [
      "MARLY Jewelry guarantees that all its products are authentic and comply with the declared quality standards.",
      "The warranty applies only to manufacturing defects and does not cover damages caused by misuse, impacts, drops, exposure to chemicals, water, or other external factors.",
      "MARLY Jewelry shall not be held responsible for losses, theft, or deterioration that occur after the product has been delivered to the customer.",
    ],
    [
      "For reservations or custom orders, a non-refundable deposit may be required to ensure the start of production.",
      "The delivery time for special orders will be communicated in advance to the client and may vary depending on the availability of materials.",
      "The cancellation of a custom order will not result in a refund, except in cases of non-compliance by the jewelry store.",
    ],
    [
      "For reservations or custom orders, a non-refundable deposit may be required to ensure the start of production.",
      "The delivery time for special orders will be communicated in advance to the client and may vary depending on the availability of materials.",
      "The cancellation of a custom order will not result in a refund, except in cases of non-compliance by the jewelry store.",
    ],
    [
      "Home deliveries will be subject to additional costs depending on the delivery area.",
      "MARLY Jewelry is not responsible for delays caused by external transportation or courier companies.",
      "Once the product has been delivered to the client or the carrier, responsibility for its care lies with the buyer.",
    ],
    [
      "All products include a manufacturing warranty of X months.",
      "Returns or exchanges are not accepted for used items, products damaged due to mishandling, or personalized/custom orders.",
      "To request an exchange or warranty review, the client must present proof of purchase.",
    ],
    [
      "The client is responsible for the proper care of the purchased pieces.",
      "It is recommended to avoid contact with perfumes, chlorine, detergents, humidity, and impacts.",
      "Natural wear from regular use is not covered by the warranty.",
    ],
    [
      "The client authorizes MARLY Jewelry to use their personal data for billing, communication, and marketing purposes, in accordance with the Personal Data Protection Law (Law No. 29733 - Peru).",
      "The jewelry store guarantees the confidentiality of the information and will not share it with third parties without the client's authorization, except when legally required.",
    ],
    [
      "Any claim must be submitted through our physical or virtual Complaints Book.",
      "It is recommended to present the receipt or invoice for faster processing.",
    ],
  ];

  return (
    <>
      <Header />
      <h2 className="text-2xl xs:text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        TERMS AND CONDITIONS
      </h2>
      <div className="my-20 mx-auto w-[60%] mx-auto">
        <p>
          The services and products offered by MARLY Jewelry are governed by the
          following general conditions. By making a purchase, reservation, or
          requesting a service, the client expressly accepts these terms.
        </p>
        <ConditionsComponet
          titulo="A. Responsibility"
          subtitulos={conditions[0]}
        />
        <ConditionsComponet
          titulo="B. Purchases, Payments, and Prices"
          subtitulos={conditions[1]}
        />
        <ConditionsComponet
          titulo="C. Reservations and Custom Orders"
          subtitulos={conditions[2]}
        />
        <ConditionsComponet
          titulo="D. Deliveries and Shipping"
          subtitulos={conditions[3]}
        />
        <ConditionsComponet
          titulo="E. Warranties, Exchanges, and Returns"
          subtitulos={conditions[4]}
        />
        <ConditionsComponet
          titulo="F. Jewelry Care"
          subtitulos={conditions[5]}
        />
        <ConditionsComponet
          titulo="G. Personal Data"
          subtitulos={conditions[6]}
        />
        <ConditionsComponet titulo="H. Claims" subtitulos={conditions[7]} />
      </div>
      <Footer />
    </>
  );
}

export default TermsConditions;
