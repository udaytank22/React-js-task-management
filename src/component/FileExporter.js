import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// Helper to flatten nested arrays
const flattenData = (data) => {
  const result = [];

  data.forEach((item) => {
    let hasNestedArray = false;

    Object.entries(item).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        hasNestedArray = true;

        value.forEach((nested) => {
          const flattened = {
            ...Object.fromEntries(
              Object.entries(item).filter(([, v]) => !Array.isArray(v))
            ),
          };

          // Prefix nested keys with nested object name
          Object.entries(nested).forEach(([nestedKey, nestedValue]) => {
            flattened[`${key}_${nestedKey}`] = nestedValue;
          });

          result.push(flattened);
        });
      }
    });

    if (!hasNestedArray) {
      result.push(item);
    }
  });

  return result;
};

export const exportToExcel = ({ data, fileName }) => {
  const finalData = flattenData(data);

  const worksheet = XLSX.utils.json_to_sheet(finalData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};
