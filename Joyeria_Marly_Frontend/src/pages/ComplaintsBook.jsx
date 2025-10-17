import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputComplaintsBook from "../components/InputComplaintsBookComponent";

function ComplaintsBook() {
  return (
    <>
      <Header />
      <h2 className="text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        COMPLAINTS BOOK
      </h2>
      <div className="my-15 flex flex-col items-center -ml-50">
        <InputComplaintsBook titulo="TYPE OF DOCUMENT" />
        <InputComplaintsBook titulo="IDENTIFICATION NUMBER" />
        <InputComplaintsBook titulo="FIRST NAME" />
        <InputComplaintsBook titulo="MIDDLE NAME" />
        <InputComplaintsBook titulo="FATHER'S LAST NAME" />
        <InputComplaintsBook titulo="MOTHER'S LAST NAME" />
        <InputComplaintsBook titulo="EMAIL" />
        <InputComplaintsBook titulo="INCIDENT DATE" />
        <InputComplaintsBook titulo="RESERVE MEDIUM" />
        <InputComplaintsBook titulo="RECORD TYPE" />
        <InputComplaintsBook titulo="PLEASE DESCRIBE THE PROBLEM" extraMargin />
      </div>
      <Footer />
    </>
  );
}

export default ComplaintsBook;
