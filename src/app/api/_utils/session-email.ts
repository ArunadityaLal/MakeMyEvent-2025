import { sendMail } from "@/lib/mailer";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "make-my-event.vercel.app";

const FACULTY_DATA = {
  "muigoku42@gmail.com": {
    facultyName: "Dr. MUI Goku",
    email: "muigoku42@gmail.com",
    sessions: [
      {
        title: "Intro",
        startTime: "9/11/2025 1:15 PM",
        endTime: "9/11/2025 1:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "rekhasolomon1@gmail.com": {
    facultyName: "Dr. Rekha Solomon",
    email: "rekhasolomon1@gmail.com",
    sessions: [
      {
        title: "Lactate in Septic Shock: Marker of Perfusion or Marker of Confusion?",
        startTime: "8/11/2025 9:45 AM",
        endTime: "8/11/2025 10:15 AM",
        role: "Debater - FOR Marker of perfusion",
        description: "Co Debater\nDr. Sandeep Dhingra for marker of confusion",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "reshma1987@gmail.com": {
    facultyName: "Dr. Reshma A",
    email: "reshma1987@gmail.com",
    sessions: [
      {
        title: "HSCT: Navigating HSCT Challenges",
        startTime: "7/11/2025 8:30 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Panelist",
        description: "Dr. Indira Jayakumar (Moderator), \nCo Panelists\nDr. Abdul Rauf\nDr. Sanket R\nDr Abhinav\nDr Krishna Chaitanya",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Stamp of Quality or Just a Stamp?\nImpact of PICU Accreditation",
        startTime: "9/11/2025 9:45 AM",
        endTime: "9/11/2025 10:15 AM",
        role: "Debater - Stamp of Quality",
        description: "Co Debater - Dr Karunakar\n- Just a stamp",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Back to Basics\nSystematic Assessment and\nidentification of sick kids\nPCCN workshop",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:10 PM",
        role: "Workshop",
        description: "Online Session",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Tuning the Tiny Tots:\nStabilization of a child in shock\nand Hemodynamic Monitoring\nPCCN workshop",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Spotting the Signs\nSimulation scenario\non recognition of a sick child\n(Neuro - Poly Trauma)\nPCCN workshop",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 3:46 PM",
        role: "Workshop",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      }
    ]
  },
  "rohitbhowmick.bhowmick@gmail.com": {
    facultyName: "Dr. Rohit Bhowmick",
    email: "rohitbhowmick.bhowmick@gmail.com",
    sessions: [
      {
        title: "Management of Complications related to blood based dialysis in PICU",
        startTime: "7/11/2025 2:15 PM",
        endTime: "7/11/2025 3:00 PM",
        role: "Panelist",
        description: "DCo- Debater\n Karunakar BP - Just a stamp",
        place: "Hall A",
        institution: " "
      },
      {
        title: "L1: AKI in PICU\nCRRT and SLED",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:30 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles, Kondapur"
      },
      {
        title: "W4: Therapeutic Plasma Exchange & other Extracorporeal Therapies in sepsis\nCRRT and SLED",
        startTime: "6/11/2025 4:30 PM",
        endTime: "6/11/2025 5:10 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Airways, Algorithms, and Accreditation: The Many Facets of Pediatric Critical Care",
        startTime: "9/11/2025 9:00 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drrohitvohra87@gmail.com": {
    facultyName: "Dr. Rohit Vohra",
    email: "drrohitvohra87@gmail.com",
    sessions: [
      {
        title: "Acute Flaccid Paralysis in the PICU: GBS, Myelitis, or Something Else?",
        startTime: "7/11/2025 11:15 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Moderator",
        description: "Panelists\n\nDr Jesal Sheth\nDr Ramaling Loni \nDr Mukesh Jain\nDr Mihir Sarkar\nDr. Suchitra D",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "drromit@gmail.com": {
    facultyName: "Dr. Romit Saxena",
    email: "drromit@gmail.com",
    sessions: [
      {
        title: "Namaste & Nurture” – Pre-briefing & Ice-Breaker\nTransport ",
        startTime: "6/11/2025 8:00 AM",
        endTime: "6/11/2025 8:30 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      },
      {
        title: "Yatra Begins!”\n– Fundamentals of Pediatric Transport\nTransport",
        startTime: "6/11/2025 8:30 AM",
        endTime: "6/11/2025 9:15 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "“Ambulance Darshan” –Inside the Beast: Ambulance Anatomy & Action Zone\nTransport",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:15 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Intra-Hospital Rescue Run\nTransport",
        startTime: "6/11/2025 12:45 PM",
        endTime: "6/11/2025 1:30 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "docsagar2002@yahoo.co.in": {
    facultyName: "Dr. Sagar Hiremath",
    email: "docsagar2002@yahoo.co.in",
    sessions: [
      {
        title: "Cardiac Failure & Cardiogenic Shock",
        startTime: "7/11/2025 9:00 AM",
        endTime: "7/11/2025 9:40 AM",
        role: "Panelists",
        description: "Dr. Priyavarthini (Moderator)\nCo Panelists\nDr. Ravi Kumar\nDr Ikram Ul Haque \nDr Javed Ismail \nDr Kalyan Kunchapudi",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Pre-operative Stabilization and Transport of Critically Ill Cardiac Patients\nCardiac Critical Care",
        startTime: "6/11/2025 9:40 AM",
        endTime: "6/11/2025 10:05 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      },
      {
        title: "Station 1: Seeing is Believing: Hands-On Echo for Pediatric Hearts\nCardiac Critical Care",
        startTime: "6/11/2025 1:15 PM",
        endTime: "6/11/2025 4:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      }
    ]
  },
  "drsagarlad@yahoo.com": {
    facultyName: "Dr. Sagar lad",
    email: "drsagarlad@yahoo.com",
    sessions: [
      {
        title: "Global Lungs, Local Challenges: Advancing Equitable Pediatric Respiratory Care",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelists",
        description: "Dr Maninder Dhaliwal (Moderator )\nCo Panelists\nDr Rajiv Uttam\nDr Shekhar Venkatraman\nDr Mounika Reddy\nDr Yeshwanth Reddy",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "ksajith120@yahoo.com": {
    facultyName: "Dr. Sajith Keswan",
    email: "ksajith120@yahoo.com",
    sessions: [
      {
        title: "Concept of Recruitment to Inflation Ratio - What does it really mean ?",
        startTime: "7/11/2025 12:15 PM",
        endTime: "7/11/2025 12:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Lower airway pathologies\nBronchoscopy",
        startTime: "6/11/2025 11:45 AM",
        endTime: "6/11/2025 12:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Flexible bronchoscopy\nBronchoscopy",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      }
    ]
  },
  "ssadawarte@gmail.com": {
    facultyName: "Dr. Sameer Sadawarte",
    email: "ssadawarte@gmail.com",
    sessions: [
      {
        title: "Dengue Gone Wild: Navigating the Complications (Agenda: Complicated Dengue)",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelists",
        description: "Dr Rachna Sharma(Moderator )\n Panelists\nDr Sateesh Ghanta\nDr Daisy Khera\nDr Rujipat\nDr.JV Rao",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Pediatric critical care at Legal cross routes",
        startTime: "7/11/2025 2:30 PM",
        endTime: "7/11/2025 3:10 PM",
        role: "Moderator:",
        description: "\nPanelists:\nDr Amita Kaul\nDr Manju Kedarnath\nDr Vinayak Pataki\nDr NL Sridhar\nDr Amar Singh ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "dingrasandeep@yahoo.co.in": {
    facultyName: "Dr. Sandeep Dhingra",
    email: "dingrasandeep@yahoo.co.in",
    sessions: [
      {
        title: "Lactate in Septic Shock: Marker of Perfusion or Marker of Confusion?\n(agenda- Use of Lactate to Guide Resuscitation in Pediatric Septic Shock: Helpful Marker or Misleading Metric? DEBATE",
        startTime: "8/11/2025 9:45 AM",
        endTime: "8/11/2025 10:15 AM",
        role: "Debater - FOR Marker of CONFUSION",
        description: "Dr Rekha Solomon Debator - FOR Marker of perfusion",
        place: "Hall B",
        institution: " "
      },
      {
        title: "The Metabolic Challenge",
        startTime: "22/9/2025 2:30 AM",
        endTime: "22/9/2025 3:45 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drghorpadesanjay@gmail.com": {
    facultyName: "Dr. Sanjay Ghorpade",
    email: "drghorpadesanjay@gmail.com",
    sessions: [
      {
        title: "Biomarkers in Pediatric Critical Care: Hype vs. Help",
        startTime: "9/11/2025 12:30 PM",
        endTime: "9/11/2025 12:45 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Friend, Foe, or Firefighting Tool? CRRT & Plasmapheresis in Pediatric ALF",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 10:15 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "porwalsanketh@gmail.com": {
    facultyName: "Dr. Sanket R",
    email: "porwalsanketh@gmail.com",
    sessions: [
      {
        title: "HSCT: Navigating HSCT Challenges",
        startTime: "7/11/2025 8:30 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Panelists",
        description: "Dr Indira Jayakumar(Moderator)\nCo Panelists\nDr Reshma A ,\nDr Abdul Rauf\nDr Abhinav\nDr Krishna Chaitanya",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Physiological Difficult Airway\nBPICC",
        startTime: "3/11/2025 9:45 AM",
        endTime: "3/11/2025 10:15 AM",
        role: "Workshop Faculty",
        description: "ONLINE LECTURES",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "Airway :Bag and Mask/ Intubation/ LMA & RSI\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Shock Cases\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Beyond the Bedside: Ethics, Quality & Safety in PICU",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 5:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drsoans62@gmail.com": {
    facultyName: "Dr. Santosh Soans",
    email: "drsoans62@gmail.com",
    sessions: [
      {
        title: "Thrombosis Meets Cytokine Storm in Sepsis: What Should We Tame First?",
        startTime: "9/11/2025 9:15 AM",
        endTime: "9/11/2025 9:30 AM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Friend, Foe, or Firefighting Tool? CRRT & Plasmapheresis in Pediatric ALF",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 10:15 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drpandian81@gmail.com": {
    facultyName: "Dr. Sarvanan Pandian",
    email: "drpandian81@gmail.com",
    sessions: [
      {
        title: "Post-Transplant Panic: ICU Nightmares After Pediatric Liver Transplant",
        startTime: "9/11/2025 9:15 AM",
        endTime: "9/11/2025 9:30 AM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "sasidarpgi@gmail.com": {
    facultyName: "Dr. Sasidaran",
    email: "sasidarpgi@gmail.com",
    sessions: [
      {
        title: "Precision prescription methods in CRRT",
        startTime: "7/11/2025 3:00 PM",
        endTime: "7/11/2025 3:15 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "PICU Case Cafe",
        startTime: "7/11/2025 10:10 AM",
        endTime: "7/11/2025 10:45 AM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Panel Discussion: CKRT: When, What & How\nCRRT and SLED",
        startTime: "6/11/2025 1:15 PM",
        endTime: "6/11/2025 1:45 PM",
        role: "National coordinator",
        description: "Moderator: \nDr Sasidharan Kandasamy\nPanelists:\nDr Mounika M\nDr Balakrishna P\n2 Local faculty.",
        place: " ",
        institution: "KIMS Cuddles, Kondapur"
      },
      {
        title: "W2: CKRT in PICU, Prescription, Troubleshooting - CASE BASED APPROACH\nCRRT and SLED",
        startTime: "6/11/2025 3:10 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "National coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "RRT Timing: Act Fast or Wait Smart?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:45 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "satheeshponnar@gmail.com": {
    facultyName: "Dr. Satheesh Ponnarneni",
    email: "satheeshponnar@gmail.com",
    sessions: [
      {
        title: "Management of Complications related to blood based dialysis in PICU",
        startTime: "7/11/2025 2:15 PM",
        endTime: "7/11/2025 3:00 PM",
        role: "Moderator",
        description: "Co Panelists\nDr Raghad Abdwani\nDr Parag Dakate \nDr Sumant Patil \nDr Saumen Meur \nDr Rohit Bhowmick",
        place: "Hall A",
        institution: " "
      },
      {
        title: "L6: Anticoagulation Considerations in CKRT\nCRRT and SLED",
        startTime: "6/11/2025 11:45 AM",
        endTime: "6/11/2025 12:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles, Kondapur"
      },
      {
        title: "W3: RRT on ECMO & Tandem Therapies\nCRRT and SLED",
        startTime: "6/11/2025 3:50 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drsatishghanta@gmail.com": {
    facultyName: "Dr. Satish Ghanta",
    email: "drsatishghanta@gmail.com",
    sessions: [
      {
        title: "Dengue Gone Wild: Navigating the Complications (Agenda: Complicated Dengue)",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr Rachna Sharma(Moderator )\nCo Panelists\nDr Daisy Khera\nDr Rujipat\nDr Sameer Sadawarte\nDr. JV Rao",
        place: "Hall C",
        institution: " "
      },
      {
        title: "High Flow Nasal Cannula in and out of PICU Ward\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Skill Station 2: Case Based Scenario of Hypercarbia\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 3:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      }
    ]
  },
  "kandathsathish@gmail.com": {
    facultyName: "Dr. K.Sathish Kumar",
    email: "kandathsathish@gmail.com",
    sessions: [
      {
        title: "Beyond Survival: Navigating Long-Stay Challenges in the PICU",
        startTime: "9/11/2025 3:15 PM",
        endTime: "9/11/2025 3:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "deopujaris@gmail.com": {
    facultyName: "Dr. Satish Deopujari",
    email: "deopujaris@gmail.com",
    sessions: [
      {
        title: "From Screen to Stethoscope: Apps That Enhance Pediatric Care",
        startTime: "7/11/2025 1:30 PM",
        endTime: "7/11/2025 3:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Interpreting Critical Labs in Suspected Metabolic Disease \n",
        startTime: "8/11/2025 1:00 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Panelist",
        description: "Dr. Banani Poddar (Moderator)\nCo Panelists\nDr Karunakar BP\nDr Dayanand Nakate\nDr Shalu Gupta\nDr Priyabrata Panda ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "saumenmeur@yahoo.co.uk": {
    facultyName: "Dr. Saumen Meur",
    email: "saumenmeur@yahoo.co.uk",
    sessions: [
      {
        title: "Management of Complications related to blood based dialysis in PICU",
        startTime: "7/11/2025 2:15 PM",
        endTime: "7/11/2025 3:00 PM",
        role: "Panelist",
        description: "Moderator: \nDr Sateesh Ponnarmeni \n\nCo-Panelists\nDr Raghad Abdwani\nDr Parag Dakate \nDr Sumant Patil \nDr Rohit Bhowmick",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Neuromonitoring in PICU using POCUS\nPOCUS \n  (Basic)",
        startTime: "6/11/2025 12:00 PM",
        endTime: "6/11/2025 12:30 PM",
        role: "Worskshop Faculty",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      }
    ]
  },
  "ssenthilsmc@yahoo.co.in": {
    facultyName: "Dr. Senthil Kumar",
    email: "ssenthilsmc@yahoo.co.in",
    sessions: [
      {
        title: "Top 5 ICU Red Flags You Should Never Miss",
        startTime: "9/11/2025 5:15 PM",
        endTime: "9/11/2025 5:25 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drshalugupta@yahoo.co.in": {
    facultyName: "Dr. Shalu Gupta",
    email: "drshalugupta@yahoo.co.in",
    sessions: [
      {
        title: "Interpreting Critical Labs in Suspected Metabolic Disease",
        startTime: "8/11/2025 1:00 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Panelist",
        description: "Dr Banani Poddar (Moderator )\nCo Panelists\nDr Satish Deopujari \nDr Karunakar BP\nDr Dayanand Nakate\nDr Priyabrata Panda ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Friend, Foe, or Firefighting Tool? CRRT & Plasmapheresis in Pediatric ALF",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panellist",
        description: "Dr Jolly Chandaran (Moderator)        \nCo Panelists\nDr Uma Ali\nDr Vasudha\nDr Deepankar Bansal\nDr Avinash Reddy",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Basic Mechanical Ventilation\nBPICC",
        startTime: "3/11/2025 10:15 AM",
        endTime: "3/11/2025 10:45 AM",
        role: "Worskshop Faculty",
        description: "ONLINE LECTURES",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "Panel Discussion\nSetting Up of Ventilator \nBPICC",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:40 AM",
        role: "Worskshop Faculty",
        description: "Moderator: \nDr. Shalu Gupta\nPanelists: \nDr.Anand\nDr Jolly Chandran, \nDr Ririe \nDr Ragad Aldhwani",
        place: " ",
        institution: " "
      },
      {
        title: "CPAP/ HFNC\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Worskshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Difficult Ventilation Scenarios\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Worskshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "minhaj1609@gmail.com": {
    facultyName: "Dr. Sheikh Minhaj",
    email: "minhaj1609@gmail.com",
    sessions: [
      {
        title: "Rescue, Restore, Rewire: Protecting the Pediatric  Brain After Trauma and Arrest.",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr Vinayak Patki(Moderator)\nCo Panelists\nDr Shrishu Kamath\nDr Sudeep KC\nDr Sibabrata Patnaik\nDr Raghupathi R",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Code Red: Rapid Response to Pediatric GI Bleed",
        startTime: "8/11/2025 9:00 AM",
        endTime: "8/11/2025 9:15 AM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Introduction to workshop\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:05 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      },
      {
        title: "Work Stations x 03 Groups\n A.Oxygen delivery devices\n B.Airway management – Intubation hands on\n C.ABG analysis\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 11:30 AM",
        endTime: "6/11/2025 1:00 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      },
      {
        title: "Essentials of fluid therapy\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      },
      {
        title: "Mapping the Maze: Pediatric Hemodynamics from Scores to Solutions",
        startTime: "8/11/2025 9:00 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "drshiv2014@gmail.com": {
    facultyName: "Dr. Shivkumar",
    email: "drshiv2014@gmail.com",
    sessions: [
      {
        title: "Palliative Cardiac Surgery in Resource-Limited Settings: Ethical Necessity or Compromise?",
        startTime: "8/11/2025 9:45 AM",
        endTime: "8/11/2025 10:15 AM",
        role: "Debater - Ethical Necessity",
        description: "Co-debator:\nDr Amish Vora - Compromise\n",
        place: "Hall A",
        institution: " "
      },
      {
        title: "USG guided vascular access (Central & arterial line insertion)\nPOCUS \n  (Basic)",
        startTime: "6/11/2025 11:15 AM",
        endTime: "6/11/2025 11:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      },
      {
        title: "Free Paper",
        startTime: "9/11/2025 8:00 AM",
        endTime: "9/11/2025 9:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "shrishu@yahoo.com": {
    facultyName: "Dr. Shrishu Kamath",
    email: "shrishu@yahoo.com",
    sessions: [
      {
        title: "Rescue, Restore, Rewire: Protecting the Pediatric Brain After Trauma and Arrest.",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr Vinayak Patki(Moderator)\nCo Panelists\nDr Sheikh Minhaj\nDr Sudeep KC\nDr Sibabrata Patnaik\nDr Raghupathi R",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Difficult Airway: Plan-B and Beyond",
        startTime: "9/11/2025 9:15 AM",
        endTime: "9/11/2025 9:30 AM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Pediatric Polytrauma: To Cut or Not to Cut?",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 12:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "shubhadeepnrsdoc@gmail.com": {
    facultyName: "Dr. Shubhadeep Das",
    email: "shubhadeepnrsdoc@gmail.com",
    sessions: [
      {
        title: "Infections in the Cardiac ICU: When Bugs Break Hearts",
        startTime: "7/11/2025 8:20 AM",
        endTime: "7/11/2025 8:40 AM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Cardiac Critical Care\nThe Road to Recovery: Essential Post-Op Care of pediatric cardiac patients",
        startTime: "6/11/2025 12:10 PM",
        endTime: "6/11/2025 12:35 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      },
      {
        title: "Cardiac Critical Care\nStation 3: Real Cases, Real Solutions: Navigating Pediatric Cardiac Crises",
        startTime: "6/11/2025 1:15 PM",
        endTime: "6/11/2025 4:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      }
    ]
  },
  "drsbpatnaik45@gmail.com": {
    facultyName: "Dr. Sibabrata Patnaik",
    email: "drsbpatnaik45@gmail.com",
    sessions: [
      {
        title: "Rescue, Restore, Rewire: Protecting the Pediatric Brain After Trauma and Arrest.",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr Vinayak Patki(Moderator)\nCo Panelists\nDr Sheikh Minhaj\nDr Shrishu Kamath\nDr Sudeep KC\nDr Raghupathi R",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Data Overload: Does More Monitoring Mean Better Outcomes?",
        startTime: "9/11/2025 3:45 PM",
        endTime: "9/11/2025 4:15 PM",
        role: "Debator - FOR",
        description: "Co-debator\nDr Anjul Dayal -  AGAINST",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Beyond Consent: Navigating Ethical Minefields in Pediatric Research",
        startTime: " ",
        endTime: " ",
        role: "Panelist",
        description: "Moderator\nDr Karthik Narayanan\n\nPanelists\nDr Bhakti Sarangi\nDr Michael Canarie\nDr Yasser Kazzaz\nDr Harish Kumar H",
        place: " ",
        institution: " "
      },
      {
        title: "Simulation",
        startTime: "6/11/2025 8:00 AM",
        endTime: "6/11/2025 5:00 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "All India Institute of Medical Sciences, Bibinagar"
      },
      {
        title: "Case-Based Panel: “My Worst Myocarditis Case in the PICU",
        startTime: "22/9/2025 3:45 PM",
        endTime: "22/9/2025 4:25 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "siva.anjin@gmail.com": {
    facultyName: "Dr. Siva Vyasam",
    email: "siva.anjin@gmail.com",
    sessions: [
      {
        title: "Super-Refractory Status Epilepticus: How Far Should We Go?",
        startTime: "7/11/2025 11:45 AM",
        endTime: "7/11/2025 12:30 PM",
        role: "Panelist",
        description: "Dr Atul Jindle (Moderator) \nCo Panelists\nDr Matthew Kirschen\nDr Bharat Mehra\nDr Pushpraj Awasthi\nDr Sridevi N",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "somu.rgk@gmail.com": {
    facultyName: "Dr. Somnath Gorain",
    email: "somu.rgk@gmail.com",
    sessions: [
      {
        title: "Saving Lives, Saving Costs: Can We Do Both?",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr Nirmal Choraria (Moderator)\nCo Panelists\nDr Jalani Basha\nDr Kshama Daphtary\nDr Akash Bang\nDr N L Sridhar",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drsonal287@gmail.com": {
    facultyName: "Dr. Sonal Gajbhiya",
    email: "drsonal287@gmail.com",
    sessions: [
      {
        title: "Liver Transplant: Mastering Post-Op Complications",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 8:30 AM",
        role: "Panelist",
        description: "Dr Ravi T (Moderator)\nCo Panelists\nDr Akashdeep\nDr Prashant Bachina\nDr Ravi Babu K \nDr Venkat Sandeep Reddy",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Inside the Brain – Transcranial Doppler, ANATOMICAL , RADIOLOGICAL COOREATION Physics , principles , trouble shooting , WINDOWS\nPOCUS (Advanced)",
        startTime: "6/11/2025 8:00 AM",
        endTime: "6/11/2025 8:30 AM",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "Neuro Monitoring - Probe placement demonstration\n  ( TCD )\nPOCUS (Advanced)",
        startTime: "6/11/2025 9:20 AM",
        endTime: "6/11/2025 9:40 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drsudani@gmail.com": {
    facultyName: "Dr. Soonu Udani",
    email: "drsudani@gmail.com",
    sessions: [
      {
        title: "Decoding Hyperferritinemia in PICU",
        startTime: "7/11/2025 9:00 AM",
        endTime: "7/11/2025 9:15 AM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "From Collapse to Comeback: Pediatric Cardiac Arrest through the Lens of Multidisciplinary Care",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr Nameet Jerath (Moderator )\nCo Panelists\nDr Manish Sharma\nDr Vinay Nadkarni\nDr Manu Sundaram\nDr Milind Jambagi",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "suchitraranjit@yahoo.co.in": {
    facultyName: "Dr. Suchitra Ranjit",
    email: "suchitraranjit@yahoo.co.in",
    sessions: [
      {
        title: "Recognize, Stratify, Intervene: The New Paradigm in Sepsis Phenotypes",
        startTime: "8/11/2025 9:30 AM",
        endTime: "8/11/2025 9:45 AM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Echo in Action: Real-Time Clarity for Real-Life Hemodynamics.",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelists",
        description: "Moderator \nDr Dhiren Gupta  \n\nPanelists\nDr Mehak Bansal\nDr Neil C \nDr Swathi Rao\nDr Namita Ravikumar",
        place: "Hall B",
        institution: " "
      },
      {
        title: "From Wards to Policy: Nuturing a Healthier Future For India's Children",
        startTime: "8/11/2025 5:30 PM",
        endTime: "8/11/2025 5:50 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "sudeepkecy2011@gmail.com": {
    facultyName: "Dr. Sudeep KC",
    email: "sudeepkecy2011@gmail.com",
    sessions: [
      {
        title: "Rescue, Restore, Rewire: Protecting the Pediatric  Brain After Trauma and Arrest.",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr Vinayak Patki(Moderator)\nCo panelists\nDr Sheikh Minhaj\nDr Shrishu Kamath\nDr Sibabrata Patnaik\nDr Raghupathi R",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Command Code Blue:\nHigh Quality CPR\nAsystole and Shockable rhythm with\nCRM\nPCCN ",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Work shop",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Managing the Mayhem\nBasics of Poly and NeuroTrauma\nVideo assisted learning\nPCCN",
        startTime: "6/11/2025 3:40 PM",
        endTime: "6/11/2025 4:00 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "sumantsp22@gmail.com": {
    facultyName: "Dr. Sumant Patil",
    email: "sumantsp22@gmail.com",
    sessions: [
      {
        title: "Management of Complications related to blood based dialysis in PICU",
        startTime: "7/11/2025 2:15 PM",
        endTime: "7/11/2025 3:00 PM",
        role: "Panelist",
        description: "Dr Sateesh (Moderator)\nCo panelists\nDr Raghad Abdwani\nDr Parag Dakate \nDr Saumen Meur \nDr Rohit Bhowmick",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "sunit.singhi@gmail.com": {
    facultyName: "Dr. Sunit Singhi",
    email: "sunit.singhi@gmail.com",
    sessions: [
      {
        title: "Pediatric respiratory critical care research and promoting the development of a research network in India- identifying key gaps",
        startTime: "7/11/2025 10:45 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Dr Jhuma Sankar(Moderator)\nCo panelists\nDr Martin Kneyber \nDr Anil Sachdev \nDr Lalita AV \nDr Praveen Khilnani",
        place: "Hall A",
        institution: " "
      },
      {
        title: "From Wards to Policy: Nuturing a Healthier Future For India's Children",
        startTime: "8/11/2025 5:30 PM",
        endTime: "8/11/2025 5:50 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Pedicriticon Keynotes",
        startTime: "9/11/2025 11:15 AM",
        endTime: "9/11/2025 11:15 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drschandrasekar@yahoo.com": {
    facultyName: "Dr. Supraja Chandrasekhar",
    email: "drschandrasekar@yahoo.com",
    sessions: [
      {
        title: "RRT Timing: Act Fast or Wait Smart?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:45 PM",
        role: "Debater - FOR Wait Smart",
        description: "Co Debator\nDr. Anupama Yerra - For Act Fast",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Local Implementation & Overcoming Barriers\nSimulation",
        startTime: "6/11/2025 3:45 PM",
        endTime: "6/11/2025 4:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "All India Institute of Medical Sciences, Bibinagar"
      },
      {
        title: "The Hepato-Renal Tightrope: Pediatric ICU Challenges and Solutions",
        startTime: "9/11/2025 9:00 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drskpanuganti@gmail.com": {
    facultyName: "Dr Suresh Kumar Panugati",
    email: "drskpanuganti@gmail.com",
    sessions: [
      {
        title: "Electrolyte Emergencies in the PICU: Algorithms, Controversies, and Pitfalls",
        startTime: "9/11/2025 3:00 PM",
        endTime: "9/11/2025 3:45 PM",
        role: "Panelist",
        description: "Dr. Lalitha AV (Moderator)\nCo panelists\nDr. Nitish Upadhaya\nDr. Atsushi Kawaguchi\nDr. Amit Vij\nDr Bala Krishna Reddy P",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Flash Talks: PICU Dogma Disrupted",
        startTime: "9/11/2025 4:15 PM",
        endTime: "9/11/2025 5:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "sureshangurana@gmail.com": {
    facultyName: "Dr. Suresh Kumar Angurana",
    email: "sureshangurana@gmail.com",
    sessions: [
      {
        title: "The Gut-Brain Axis in Pediatric ICU: A \n Microbiome Perspective",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 2:45 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "surjeetthappa@gmail.com": {
    facultyName: "Dr. Surjit Kumar Thappa",
    email: "surjeetthappa@gmail.com",
    sessions: [
      {
        title: "GAME ON – “Crash or Stabilise?”",
        startTime: "7/11/2025 9:40 AM",
        endTime: "7/11/2025 10:00 AM",
        role: "Quizmaster",
        description: "Fellow Quizmaster:\nDr Chidambaram",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Too much, Too little or Just Right\nFluid Balance in PICU\nCase scenario based\nPCCN Workshop",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 1:45 PM",
        role: "Workshop",
        description: "Online Session",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Beyond the Machine Smooth and\nSecure:\nPreparation for Intubation with CRM , \nDOOPE , Prone Positioning,LMA\nPCCN workshop",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "WORKSHOP",
        description: "Online Session",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Spotting the Signs\nSimulation scenario\non recognition of a sick child\n(Neuro - Poly Trauma)\nPCCN workshop",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 3:46 PM",
        role: "WORKSHOP",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drswathiraoped@gmail.com": {
    facultyName: "Dr. Swathi Rao",
    email: "drswathiraoped@gmail.com",
    sessions: [
      {
        title: "Echo in Action: Real-Time Clarity for Real-Life  Hemodynamics",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr. Dhiren Gupta (Moderator)\nCo panelists\nDr. Mehak Bansal\nDr. Neil C\nDr. Namita Ravikumar\nDr. Suchitra Ranjit",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Oxygen Therapy in Respiratory Distress Children\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 8:30 AM",
        endTime: "6/11/2025 9:00 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "High Flow Nasal Cannula in and out of PICU Ward\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Skill Station 1: Case Based Scenario of Hypoxia\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 3:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      }
    ]
  },
  "doctortanzila@gmail.com": {
    facultyName: "Dr. Tanzila Sharique",
    email: "doctortanzila@gmail.com",
    sessions: [
      {
        title: "Mottled Skin: Shock or Cold Room?",
        startTime: "9/11/2025 4:45 PM",
        endTime: "9/11/2025 4:55 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Procedural sedation\nBronchoscopy",
        startTime: "6/11/2025 10:15 AM",
        endTime: "6/11/2025 10:30 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Procedural sedation\nBronchoscopy",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      }
    ]
  },
  "thangavelu.dr@gmail.com": {
    facultyName: "Dr. Thangavellu",
    email: "thangavelu.dr@gmail.com",
    sessions: [
      {
        title: "Extubation Without Agitation: Mastering Sedation \n Tapering",
        startTime: "9/11/2025 3:15 PM",
        endTime: "9/11/2025 3:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "ICU Skills You Didn't Learn in Residency (But Should Have)",
        startTime: "9/11/2025 4:15 PM",
        endTime: "9/11/2025 4:25 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Rapid Response Teams in Pediatric Wards: Early Warning to Early PICU Admission",
        startTime: "9/11/2025 4:25 PM",
        endTime: "9/11/2025 4:35 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Transcranial Doppler in Pediatric CNS Infections: Diagnostic And Prognostic Value",
        startTime: "8/11/2025 2:45 PM",
        endTime: "8/11/2025 2:45 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "drumaali22@gmail.com": {
    facultyName: "Dr. Uma Ali",
    email: "drumaali22@gmail.com",
    sessions: [
      {
        title: "Managing Sodium disurbances during CRRT",
        startTime: "7/11/2025 2:00 PM",
        endTime: "7/11/2025 2:15 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Friend, Foe, or Firefighting Tool? CRRT & Plasmapheresis in Pediatric ALF",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panellist",
        description: "Dr Jolly Chandaran (Moderator)        \nCo panelists\nDr Shalu Gupta\nDr Vasudha\nDr Deepankar Bansal\nDr Avinash Reddy",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Mapping the Maze: Pediatric Hemodynamics from Scores to Solutions",
        startTime: "8/11/2025 9:00 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "vasanthbabblu@gmail.com": {
    facultyName: "Dr. Vasanth",
    email: "vasanthbabblu@gmail.com",
    sessions: [
      {
        title: "Hemadsorption in the PICU: Magic Filter or Misplaced Faith?",
        startTime: "9/11/2025 9:45 AM",
        endTime: "9/11/2025 10:15 AM",
        role: "Debator: for Hemadsorption is Misplaced Faith",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "RRT Timing: Act Fast or Wait Smart?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:45 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drvraghunathan@gmail.com": {
    facultyName: "Dr. Veena Raghunathan",
    email: "drvraghunathan@gmail.com",
    sessions: [
      {
        title: "Coming Off CRRT: Protocol Precision or Clinical \nWisdom?",
        startTime: "9/11/2025 9:45 AM",
        endTime: "9/11/2025 10:15 AM",
        role: "Debater - FOR PROTOCOL PRECISION",
        description: "Co Debater\nDr Abhijeet Bagde - CLINICAL WISDOM ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Workstation 1: Nursing care plan of a child with respiratory distress\nNursing Respiratory Care",
        startTime: "6/11/2025 11:00 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Tracheostomy care – Hands-on training\nNursing Respiratory Care",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Beyond the Bedside: Ethics, Quality & Safety in PICU",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 5:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "vijaiwilliams@gmail.com": {
    facultyName: "Dr. Vijai Williams",
    email: "vijaiwilliams@gmail.com",
    sessions: [
      {
        title: "Start Slow or Start Smart?\nShould Golden Hour  DKA Management Be Aggressively Standardized?",
        startTime: "8/11/2025 9:45 AM",
        endTime: "8/11/2025 10:15 AM",
        role: "Debater - FOR  Start Smart",
        description: "Co Debater\nDr Ashish Simalti - Start Smart",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "dr.vikas.78@gmail.com": {
    facultyName: "Dr. Vikas Bansal",
    email: "dr.vikas.78@gmail.com",
    sessions: [
      {
        title: "The New Gold Standard in Ventilation?\nIn Mechanical Power We Trust… or Not?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Debater - WE TRUST",
        description: "Co Debater\nDr Vikas Taneja - Not Trust",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Free Paper",
        startTime: "8/11/2025 8:00 AM",
        endTime: "8/11/2025 9:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drvikastaneja@yahoo.co.in": {
    facultyName: "Dr. Vikas Taneja",
    email: "drvikastaneja@yahoo.co.in",
    sessions: [
      {
        title: "The New Gold Standard in Ventilation? In Mechanical Power We Trust… or Not?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Debater - NOT TRUST",
        description: "Co Debater\nDr Vikas Bansal - We Trust",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Echo in Action: Real-Time Clarity for Real-Life Hemodynamics",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 10:15 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "vinpreethadi@gmail.com": {
    facultyName: "Dr. Vinay Joshi",
    email: "vinpreethadi@gmail.com",
    sessions: [
      {
        title: "Silent Hypoxia: Recognizing & Managing Pulmonary Hypertensive Crisis",
        startTime: "7/11/2025 8:40 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "patkivinayak@gmail.com": {
    facultyName: "Dr. Vinayak Patki",
    email: "patkivinayak@gmail.com",
    sessions: [
      {
        title: "Rescue, Restore, Rewire: Protecting the Pediatric Brain After Trauma and Arrest.",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Moderator",
        description: "Co panelists\nDr Sheikh Minhaj \nDr Shrishu Kamath \nDr Sudeep KC \nDr Sibabrata Patnaik\nDr Raghupathi R",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Pediatric critical care at Legal cross routes",
        startTime: "7/11/2025 2:30 PM",
        endTime: "7/11/2025 3:10 PM",
        role: "Panelist",
        description: "Moderator: Dr Sameer Sadawarte\nPanelists:\nDr Amita Kaul\nDr Manju Kedarnath\nDr NL Sridhar\nDr Amar Singh ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Free Paper",
        startTime: "8/11/2025 8:00 AM",
        endTime: "8/11/2025 9:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  }
};

// Generate email subject based on number of sessions
function generateEmailSubject(facultyData: any) {
  if (facultyData.sessions.length === 1) {
    return `Session Updated: ${facultyData.sessions[0].title}`;
  } else {
    return `Sessions Updated: ${facultyData.sessions.length} Sessions`;
  }
}

// Generate HTML email using the session updated template
function renderEmailHTML(facultyEmail: string) {
  const facultyData = FACULTY_DATA[facultyEmail as keyof typeof FACULTY_DATA];

  if (!facultyData) {
    console.error(`No data found for faculty: ${facultyEmail}`);
    return "";
  }

  const loginUrl = `${baseUrl.replace(
    /\/+$/,
    ""
  )}/faculty-login?email=${encodeURIComponent(facultyData.email)}`;

  const rows = facultyData.sessions
    .map(
      (s) => `
      <tr style="border-bottom: 1px solid #eaeaea;">
        <td style="padding:10px 8px; border-right:1px solid #ddd; font-size: 13px; color: #333;">${s.title}</td>
        <td style="padding:10px 8px; border-right:1px solid #ddd; font-size: 13px; color: #333; white-space: nowrap;">${s.startTime}</td>
        <td style="padding:10px 8px; border-right:1px solid #ddd; font-size: 13px; color: #333; white-space: nowrap;">${s.endTime}</td>
        <td style="padding:10px 8px; border-right:1px solid #ddd; font-size: 13px; color: #333;">${s.role}</td>
        <td style="padding:10px 8px; border-right:1px solid #ddd; font-size: 13px; color: #333;">${s.description}</td>
        <td style="padding:10px 8px; border-right:1px solid #ddd; font-size: 13px; color: #333;">${s.place}</td>
        <td style="padding:10px 8px; font-size: 13px; color: #333;">${s.institution}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Session Updated</title>
</head>
<body style="font-family: Arial, sans-serif; line-height:1.5; color:#333; max-width:600px; margin:0 auto; padding:20px; background-color: #f5f5f5;">
  
  <!-- Header -->
  <div style="background: #f8f9fa; padding: 0; text-align: center; border-radius: 10px 10px 0 0; overflow: hidden;">
      <img src="https://make-my-event.vercel.app/images/pedicriticon-header.png" 
           alt="PediCritiCon 2025 Header"
           style="width: 100%; height: auto; display: block; max-width: 600px;" />
  </div>

  <div style="background:#fff; padding:30px; border-left:1px solid #ddd; border-right:1px solid #ddd;">
    
    <!-- Session Updated Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
        <span style="font-size: 32px; margin-right: 10px;">📝</span>
        <span style="color: #fff; font-size: 28px; font-weight: bold;">Session Updated</span>
      </div>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.6;">Dear <strong>${facultyData.facultyName}</strong>,</p>
    
    <p style="font-size: 15px; color: #555; line-height: 1.6;">
      We hope this message finds you well. We're writing to inform you that your session details have been updated.
    </p>

    <!-- Updated Session Information Box -->
    <div style="background: rgba(30,30,30,0.8); padding: 20px; border-radius: 10px; margin: 25px 0;">
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <span style="font-size: 24px; margin-right: 10px;">📋</span>
        <h3 style="color: #c084fc; margin: 0; font-size: 20px;">Updated Session Information</h3>
      </div>
      
      <!-- Session Details Table with scroll -->
      <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table style="min-width: 100%; border-collapse: collapse; margin:0; background: rgba(255,255,255,0.95); border-radius: 8px;">
          <thead style="background:#efefef;">
            <tr>
              <th style="text-align:left; padding:10px 8px; border-bottom:1px solid #ddd; border-right:1px solid #ddd; font-size: 12px; min-width: 150px;">Title</th>
              <th style="text-align:left; padding:10px 8px; border-bottom:1px solid #ddd; border-right:1px solid #ddd; font-size: 12px; min-width: 90px;">Start Time</th>
              <th style="text-align:left; padding:10px 8px; border-bottom:1px solid #ddd; border-right:1px solid #ddd; font-size: 12px; min-width: 90px;">End Time</th>
              <th style="text-align:left; padding:10px 8px; border-bottom:1px solid #ddd; border-right:1px solid #ddd; font-size: 12px; min-width: 80px;">Role</th>
              <th style="text-align:left; padding:10px 8px; border-bottom:1px solid #ddd; border-right:1px solid #ddd; font-size: 12px; min-width: 100px;">Description</th>
              <th style="text-align:left; padding:10px 8px; border-bottom:1px solid #ddd; border-right:1px solid #ddd; font-size: 12px; min-width: 80px;">Place</th>
              <th style="text-align:left; padding:10px 8px; border-bottom:1px solid #ddd; font-size: 12px; min-width: 100px;">Institution</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>

    <!-- What do you need to do? -->
    <div style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 18px;">What do you need to do?</h3>
      <p style="color: #78350f; margin: 0; font-size: 15px; line-height: 1.6;">
        Please review the updated session details and confirm your availability. If you have any concerns or conflicts with the new schedule, please reach out to us as soon as possible.
      </p>
    </div>

    <!-- View Faculty Dashboard Button -->
    <p style="text-align:center; margin: 30px 0;">
      <a href="${loginUrl}" target="_blank" style="
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color:#fff;
        padding:15px 35px;
        border-radius:25px;
        text-decoration:none;
        font-weight:bold;
        font-size:16px;
        box-shadow:0 4px 15px rgba(118,75,162,0.4);
        ">
        📅 View Faculty Dashboard
      </a>
    </p>

    <!-- Need Help Section -->
    <div style="background: #f0f9ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #1e40af; margin: 0 0 12px 0; font-size: 18px;">Need Help?</h3>
      <p style="color: #1e40af; margin: 0 0 10px 0; font-size: 15px; line-height: 1.6;">
        If you have any questions about these changes or need assistance, please don't hesitate to contact our event coordination team.
        Reach out to Shruti Bharadwaj at: <a href="mailto:shruti@abhinavagroup.com" style="color: #2563eb; text-decoration: underline;">shruti@abhinavagroup.com</a>
        Phone Number: <a href="tel:9148001818" style="color: #2563eb; text-decoration: underline;">9148001818</a>
      </p>
      <p style="color: #1e40af; margin: 0 0 10px 0; font-size: 15px; line-height: 1.6;">
        Thank you for your continued participation in ${'PediCritiCon 2025'}.
      </p>
      <p style="color: #1e40af; margin: 0; font-size: 15px;">
        <strong>Best regards,</strong><br>
        <strong>Organizing Committee</strong><br>
        ${'PediCritiCon 2025'}
      </p>
    </div>

    <p style="font-size:12px; color:#666; text-align:center; margin-top:30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      If you have questions, contact your event coordinator. This message was sent automatically.
    </p>
  </div>

  <!-- Footer -->
  <div style="background: #f8f9fa; padding: 0; text-align: center; border-radius: 0 0 10px 10px; overflow: hidden;">
      <img src="https://make-my-event.vercel.app/images/pedicriticon-footer.jpeg" 
           alt="PediCritiCon 2025 Footer"
           style="width: 100%; height: auto; display: block; max-width: 600px;" />
  </div>
</body>
</html>
`;
}

function generateEmailText(facultyEmail: string) {
  const facultyData = FACULTY_DATA[facultyEmail as keyof typeof FACULTY_DATA];

  if (!facultyData) {
    return "";
  }

  const sessionsText = facultyData.sessions
    .map(
      (s) => `Title: ${s.title}
Start Time: ${s.startTime}
End Time: ${s.endTime}
Role: ${s.role}
Description: ${s.description}
Place: ${s.place}
Institution: ${s.institution}`
    )
    .join("\n\n");

  return `Subject: Session Updated - ${facultyData.sessions[0]?.title || 'PediCritiCon 2025'}

Dear ${facultyData.facultyName},

We hope this message finds you well. We're writing to inform you that your session details have been updated.

Updated Session Information:

${sessionsText}

What do you need to do?
Please review the updated session details and confirm your availability. If you have any concerns or conflicts with the new schedule, please reach out to us as soon as possible.

View Faculty Dashboard: ${baseUrl.replace(/\/+$/, "")}/faculty-login?email=${encodeURIComponent(facultyData.email)}

Need Help?
If you have any questions about these changes or need assistance, please don't hesitate to contact our event coordination team.

Thank you for your continued participation in ${'PediCritiCon 2025'}.

Best regards,
Event Coordination Team
${'PediCritiCon 2025'}
`;
}

export async function sendBulkInviteEmail(
  sessions?: any[],
  facultyName?: string,
  email?: string
) {
  const results = [];

  for (const [facultyEmail, facultyData] of Object.entries(FACULTY_DATA)) {
    try {
      const html = renderEmailHTML(facultyEmail);
      const text = generateEmailText(facultyEmail);

      const result = await sendMail({
        to: facultyData.email,
        subject: generateEmailSubject(facultyData),
        text,
        html,
      });

      results.push({
        email: facultyData.email,
        name: facultyData.facultyName,
        success: result.ok,
        message: result.message || "Email sent successfully",
      });

      console.log(
        `Email sent to ${facultyData.facultyName} (${facultyData.email}): ${
          result.ok ? "Success" : "Failed"
        }`
      );
    } catch (error) {
      console.error(
        `Failed to send email to ${facultyData.facultyName}:`,
        error
      );
      results.push({
        email: facultyData.email,
        name: facultyData.facultyName,
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const failureCount = results.filter((r) => !r.success).length;

  console.log(
    `Email Summary: ${successCount} successful, ${failureCount} failed out of ${results.length} total`
  );

  return {
    ok: failureCount === 0,
    message: `Sent ${successCount}/${results.length} emails successfully`,
    results: results,
  };
}

export async function sendInviteEmail(
  session?: any,
  facultyName?: string,
  email?: string
) {
  return sendBulkInviteEmail();
}

export async function sendUpdateEmail(
  session?: any,
  facultyName?: string,
  roomName?: string
): Promise<{ ok: boolean; message?: string }> {
  try {
    const results = [];

    for (const [facultyEmail, facultyData] of Object.entries(FACULTY_DATA)) {
      try {
        const html = renderEmailHTML(facultyEmail);
        const text = generateEmailText(facultyEmail);

        const result = await sendMail({
          to: facultyData.email,
          subject: generateEmailSubject(facultyData),
          text,
          html,
        });

        results.push({
          email: facultyData.email,
          success: result.ok,
        });
      } catch (error) {
        console.error(
          `Failed to send update email to ${facultyData.facultyName}:`,
          error
        );
        results.push({
          email: facultyData.email,
          success: false,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    return {
      ok: failureCount === 0,
      message: `Update emails: ${successCount}/${results.length} sent successfully`,
    };
  } catch (error) {
    console.error("Failed to send update emails:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
