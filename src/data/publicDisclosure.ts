export interface DisclosureItem {
  sNo: number;
  item: string;
  detail: string;
}

export interface DisclosureDoc {
  sNo: number;
  title: string;
  fileUrl: string;
}

export const MANDATORY_PUBLIC_DISCLOSURE = {
  circular: "APPENDIX - IX (MANDATORY PUBLIC DISCLOSURE CIRCULAR NO : 09/2021)",
  generalInfo: [
    { sNo: 1, item: "NAME OF THE SCHOOL", detail: "SPS GLOBAL SCHOOL, JASWANTNAGAR ETAWAH" },
    { sNo: 2, item: "AFFILIATION NO. (IF APPLICABLE)", detail: "2134255" },
    { sNo: 3, item: "SCHOOL CODE (IF APPLICABLE)", detail: "72221" },
    { sNo: 4, item: "COMPLETE ADDRESS WITH PINCODE", detail: "SPS GLOBAL SCHOOL, NH 19 AGRA ROAD, JASWANTNAGAR ETAWAH, UTTAR PRADESH – 206245" },
    { sNo: 5, item: "PRINCIPAL NAME", detail: "MRS. DIVYA YADAV" },
    { sNo: 6, item: "PRINCIPAL QUALIFICATION", detail: "M.A. B.ED." },
    { sNo: 7, item: "SCHOOL EMAIL ID", detail: "sps.globalschool@gmail.com" },
    { sNo: 8, item: "CONTACT DETAILS (LANDLINE/MOBILE)", detail: "07618307200, 07618407200" }
  ],
  documents: [
    {
      sNo: 1,
      title: "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION",
      fileUrl: "/documents/affiliation-letter.pdf"
    },
    {
      sNo: 2,
      title: "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE",
      fileUrl: "/documents/trust-certificate.pdf"
    },
    {
      sNo: 3,
      title: "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009 & GOVT. NOC",
      fileUrl: "/documents/recognition-letter.pdf"
    },
    {
      sNo: 4,
      title: "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER NATIONAL BUILDING CODE",
      fileUrl: "/documents/building-safety-certificate.pdf"
    },
    {
      sNo: 5,
      title: "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY COMPETENT AUTHORITY",
      fileUrl: "/documents/fire-safety-certificate.pdf"
    },
    {
      sNo: 6,
      title: "COPY OF ANNUAL FEE STRUCTURE OF THE SCHOOL (SESSION 2026-27)",
      fileUrl: "/documents/fee-structure-2026-27.pdf"
    },
    {
      sNo: 7,
      title: "ANNUAL ACADEMIC CALENDAR & ACTIVITY SCHEDULE",
      fileUrl: "/documents/academic-calendar.pdf"
    }
  ],
  staffDetails: [
    { sNo: 1, item: "PRINCIPAL", detail: "MRS. DIVYA YADAV (M.A., B.ED.)" },
    { sNo: 2, item: "TOTAL NO. OF TEACHERS", detail: "20+" },
    { sNo: 3, item: "PGT TEACHERS", detail: "0" },
    { sNo: 4, item: "TGT TEACHERS", detail: "6" },
    { sNo: 5, item: "PRT TEACHERS", detail: "14" },
    { sNo: 6, item: "TEACHER-SECTION RATIO", detail: "1.5 : 1" },
    { sNo: 7, item: "SPECIAL EDUCATOR", detail: "Available as per CBSE guidelines" },
    { sNo: 8, item: "WELLNESS COUNSELOR", detail: "Available on campus" }
  ]
};
