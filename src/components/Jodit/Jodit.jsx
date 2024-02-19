/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import HTMLtoReact from "html-to-react";
import "./Jodit.scss";
const Jodit = ({ label, placeholder, onChange, value, setValue }) => {
  const config = {
    readonly: false,
    placeholder: placeholder,
    // all options from https://xdsoft.net/jodit/doc/
    language: "en", // ensure you have the language file loaded
    i18n: {
      en: {
        "Type something": "Type something", // example i18n key-value
        // add other key-values that you might need for your editor
      },
    },
  };

  const handleBlur = (newValue) => {
    setValue(newValue);
  };

  const convertHTMLToReact = (htmlContent) => {
    const htmlToReactParser = new HTMLtoReact.Parser();
    const reactElement = htmlToReactParser.parse(htmlContent);
    return reactElement;
  };

  return (
    <div className="Jodit_mota">
      <label htmlFor="" className="text-base font-medium text-gray-500">
        {label}
      </label>
      <div className="Jodit">
        <JoditEditor
          value={value}
          config={config}
          tabIndex={1}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={(newValue) => {
            const reactContent = convertHTMLToReact(newValue);
            // Now, reactContent contains the HTML content converted to React JSX
            setValue(newValue);
          }}
        />
      </div>
    </div>
  );
};

export default Jodit;
