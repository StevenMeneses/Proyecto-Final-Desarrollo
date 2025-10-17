import React from "react";
import bgImage from "/ShopIn-person.png";

export default function ShopInPerson() {
  return (
    <section className="my-20">
      {" "}
      {/* 🔹 espacio arriba y abajo uniforme */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 md:top-1/2 md:-translate-y-1/2 p-8 md:p-12 w-full md:w-1/2 lg:w-2/5 max-w-lg flex flex-col justify-center h-full"
          style={{ backgroundColor: "#997C71" }}
        >
          <h2
            className="text-4xl sm:text-5xl font-serif mb-4"
            style={{ color: "#F5E3C3", fontFamily: "Georgia, serif" }}
          >
            Shop in-person
          </h2>
          <p className="text-lg font-bold mb-3" style={{ color: "#F5E3C3" }}>
            At <span className="underline">The MARLY Shoppe</span>
          </p>
          <p className="text-md mb-3" style={{ color: "#F5E3C3" }}>
            Av. de la Marina 2000, San Miguel 15035
          </p>
          <p className="text-md mb-1" style={{ color: "#F5E3C3" }}>
            <span className="font-bold">Phone:</span> +51 998 998 143
          </p>
          <p className="text-md mb-6" style={{ color: "#F5E3C3" }}>
            <span className="font-bold">Shopper Hours:</span> Tuesday - Saturday
            from 10 AM - 5 PM
          </p>
          <a
            href="https://maps.app.goo.gl/JoW5hEGNivM7D9Sq9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit px-6 py-3 transition duration-300 rounded-sm"
            style={{
              backgroundColor: "#F5E3C3",
              color: "#997C71",
              fontWeight: "bold",
            }}
          >
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}
