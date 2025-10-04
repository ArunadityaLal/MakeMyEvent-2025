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
  "vbuche@gmail.com": {
    facultyName: "Dr. Vishram Buche",
    email: "vbuche@gmail.com",
    sessions: [
      {
        title: "The Arterial Truth: Using ABG Trends to Guide Real-Time Decisions",
        startTime: "9/11/2025 3:30 PM",
        endTime: "9/11/2025 3:45 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drvsvprasad@gmail.com": {
    facultyName: "Dr. VSV Prasad",
    email: "drvsvprasad@gmail.com",
    sessions: [
      {
        title: "Fluid, Not Flood: Smarter Resuscitation in the PICU\n",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr Mahesh Mohite (Moderator)\nCo panelists\nDr Manoj Chowdary\nDr John Adabie Appiah\nDr Mritunjay Pao\nDr Vinay Ramuni",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Buying Smart: Equipping Your PICU for Function, Not Fashion",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 3:15 PM",
        role: "Moderator",
        description: "panelists\nDr Anand Buthada\nDr Nirmal Choraria\nDr Preetam\nDr G Ramesh\nDr Rafiq Ahmed",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Oncology and Transplant ICU: Challenges & Solutions",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 10:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
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
  "milind.jambagi@gmail.com": {
    facultyName: "Dr Milind Jambagi",
    email: "milind.jambagi@gmail.com",
    sessions: [
      {
        title: "PICU Brain Buzzer",
        startTime: "7/11/2025 2:45 PM",
        endTime: "7/11/2025 3:45 PM",
        role: "QuizMaster",
        description: "Co Quiz masters: \nDr Maninder Dhaliwal, \nDr Karthik Narayan\nDr Farhan Shaikh",
        place: "Hall C",
        institution: " "
      },
      {
        title: "USG Basics, Probes and Knobology\nPOCUS (Basic)",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      },
      {
        title: "From Collapse to Comeback: Pediatric Cardiac Arrest through the Lens of Multidisciplinary Care",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Moderator\nDr. Nameet Jerath \n\nPanelists\nDr. Soonu Udani        \nDr. Manish Sharma        \nDr. Vinay Nadkarni        \nDr. Manu Sundaram",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "preityanand@yahoo.co.in": {
    facultyName: "Dr Preeti Anand",
    email: "preityanand@yahoo.co.in",
    sessions: [
      {
        title: "Case-Based Panel: “My Worst Myocarditis Case \nin the PICU",
        startTime: "9/11/2025 3:45 PM",
        endTime: "9/11/2025 4:25 PM",
        role: "Panelists",
        description: "Dr Rajeshwari (Moderator)\n\nCo panelists\nDr Manish Kori        \nDr Naresh Lal        \nDr Ravi (KKTCH)\nDr Banani Poddar",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "aldutoridd@gmail.com": {
    facultyName: "Dr Manish Kori",
    email: "aldutoridd@gmail.com",
    sessions: [
      {
        title: "Case-Based Panel: “My Worst Myocarditis Case in the PICU",
        startTime: "9/11/2025 3:45 PM",
        endTime: "9/11/2025 4:25 PM",
        role: "Panelists",
        description: "Dr Rajeshwari (Moderator)\nCo Panelists\nDr Preeti Anand   \nDr Naresh Lal        \nDr Ravi (KKTCH)\nDr Banani Poddar",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "doclal2009@gmail.com": {
    facultyName: "Dr Naresh Lal",
    email: "doclal2009@gmail.com",
    sessions: [
      {
        title: "Case-Based Panel: “My Worst Myocarditis Case in the PICU",
        startTime: "9/11/2025 3:45 PM",
        endTime: "9/11/2025 4:25 PM",
        role: "Panelists",
        description: "Dr Rajeshwari (Moderator)\n\nCo Panelists\nDr Preeti Anand   \nDr Manish Kori     \nDr Ravi (KKTCH)\nDr Banani Poddar",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drgirishc@gmail.com": {
    facultyName: "Dr Girish H C",
    email: "drgirishc@gmail.com",
    sessions: [
      {
        title: "Accidental Drug Overdose or Wrong Drug in the PICU: First Response and Reporting",
        startTime: "9/11/2025 4:35 PM",
        endTime: "9/11/2025 4:45 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "parveenbharadwaj@hotmail.com": {
    facultyName: "Dr Praveen Bharadwaj",
    email: "parveenbharadwaj@hotmail.com",
    sessions: [
      {
        title: "Chest Tube Not Bubbling: What Should You Do?",
        startTime: "9/11/2025 12:25 PM",
        endTime: "9/11/2025 12:35 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Hemodynamic assessment using functional ECHO\nPOCUS \n (Basic)",
        startTime: "6/11/2025 10:45 AM",
        endTime: "6/11/2025 11:15 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      }
    ]
  },
  "drsunildsharma@gmail.com": {
    facultyName: "Dr Sunil Dutt Sharma",
    email: "drsunildsharma@gmail.com",
    sessions: [
      {
        title: "BP Crisis in Children: Think Fast, Act Slow",
        startTime: "9/11/2025 1:15 PM",
        endTime: "9/11/2025 1:25 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "rgundeti@gmail.com": {
    facultyName: "Dr G Ramesh",
    email: "rgundeti@gmail.com",
    sessions: [
      {
        title: "Buying Smart: Equipping Your PICU for Function, Not Fashion",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 3:15 PM",
        role: "Panelist",
        description: "Moderator \nDr VSV Prasad \n\nCo Panelists\nDr Anand Buthada\nDr Rafiq Ahmed \nDr Nirmal Choraria\nDr Preetam",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "kalyancriticare@gmail.com": {
    facultyName: "Dr S kalyan Kunchapudi",
    email: "kalyancriticare@gmail.com",
    sessions: [
      {
        title: "Cardiac Failure & Cardiogenic Shock",
        startTime: "7/11/2025 9:00 AM",
        endTime: "7/11/2025 9:40 AM",
        role: "Panelists",
        description: "Dr.\nPriyavarthini (Moderator)\nCo Panelists\nDr. Ravi Kumar (KKCTH)\nDr Ikram Ul Haque \nDr Javed Ismail \nDr.Sagar Hiremath (NH Bnagalore) ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "PANEL DISCUSSION - HYPOXEMIA, REFRACTORY HYPOXEMIA\nAdvanced Ventilation",
        startTime: "6/11/2025 11:30 AM",
        endTime: "6/11/2025 12:30 PM",
        role: "Local Cordinator",
        description: "Moderator: Dr. Yashwanth Reddy \n Panelists: \nDr. Sekhar Venkatraman, \nDr. Nameet Jerath, \nDr. Kalyan, \nDr. Prabas Prasun",
        place: " ",
        institution: "KIMS Cuddles Secunderabad"
      },
      {
        title: "MECHANICAL VENTILATION ON ECMO – DOES VA OR VV MATTER?\nAdvanced Ventilation",
        startTime: "6/11/2025 2:40 PM",
        endTime: "6/11/2025 3:00 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "AEROSOL ADMINISTRATION IN VENTILATION AND POSTURAL PHYSIOTHERAPY\nAdvanced Ventilation",
        startTime: "6/11/2025 5:00 PM",
        endTime: "6/11/2025 5:40 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "kvsandeepreddy@gmail.com": {
    facultyName: "Dr Venkat Sandeep Reddy",
    email: "kvsandeepreddy@gmail.com",
    sessions: [
      {
        title: "Liver Transplant: Mastering Post-Op Complications",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 8:30 AM",
        role: "Panelist",
        description: "Dr Ravi T (Moderator)\nCo Panelists\nDr Akashdeep\nDr Prashant Bachina\nDr Ravi Babu K \nDr Sonal Gajbhiya",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Station 2: Life Support Mastery: ECMO, and iNO in Pediatric Cardiac Care\nCardiac Critical Care",
        startTime: "6/11/2025 1:15 PM",
        endTime: "6/11/2025 4:15 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      }
    ]
  },
  "drsuchitrajoty@gmail.com": {
    facultyName: "Dr Suchithra D (Hyd)",
    email: "drsuchitrajoty@gmail.com",
    sessions: [
      {
        title: "Acute Flaccid Paralysis in the PICU: GBS, Myelitis, or Something Else?",
        startTime: "7/11/2025 11:15 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Moderator \nDr Rohit Vohra \n\nPanelists\nDr Jesal Sheth\nDr Ramaling Loni \nDr Mukesh Jain\nDr Mihir Sarkar",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Bridges and Roadblocks in Thesis Writing: A Guide’s Perspective\nCLINICAL RESEARCH",
        startTime: "6/11/2025 4:00 PM",
        endTime: "6/11/2025 4:20 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
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
  "nrao_aslp@yahoo.com": {
    facultyName: "Dr. Sridevi N",
    email: "nrao_aslp@yahoo.com",
    sessions: [
      {
        title: "Super-Refractory Status Epilepticus: How Far Should We Go?",
        startTime: "7/11/2025 11:45 AM",
        endTime: "7/11/2025 12:30 PM",
        role: "Panelist",
        description: "Dr. Atul Jindle (Moderator) \nCo Panelists \nDr. Matthew Kirschen \nDr. Siva Vyasam \nDr. Pushpraj Awasthi\nDr Bharat Mehra",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Pre- Test\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 8:15 AM",
        endTime: "6/11/2025 8:30 AM",
        role: "Local coordinator",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "High Flow Nasal Cannula in and out of PICU Ward\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Local coordinator",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Skill Station 1: Case Based Scenario of Hypoxia\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 3:45 PM",
        role: "Local coordinator",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Post-Test\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 4:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Local coordinator",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      }
    ]
  },
  "drsujeeth.27@gmail.com": {
    facultyName: "Dr Modi Sujeeth Kumar",
    email: "drsujeeth.27@gmail.com",
    sessions: [
      {
        title: "Breathless Battles: Viral Pneumonia That Won’t Back Down: What's the Trend in Pediatric Viral Pneumonia?",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr. Manish Sharma (Moderator)        \nCo Panelists\nDr. Anil Sachdeva        \nDr. Hiroshi Kurosawa        \nDr. Ranganath Iyer\nDr. Bala Ramachandran",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Introduction\nBPICC",
        startTime: "3/11/2025 9:00 AM",
        endTime: "3/11/2025 9:15 AM",
        role: "Local Cordinator",
        description: "ONLINE LECTURES",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "ABG analysis\nBPICC",
        startTime: "3/11/2025 1:15 PM",
        endTime: "3/11/2025 1:45 PM",
        role: "Local Cordinator",
        description: "ONLINE LECTURES",
        place: " ",
        institution: " "
      },
      {
        title: "PICU Procedures  (CVL)\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Difficult Ventilation Scenarios\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "yashu198@yahoo.co.in": {
    facultyName: "Dr. Yashwanth Reddy",
    email: "yashu198@yahoo.co.in",
    sessions: [
      {
        title: "Global Lungs, Local Challenges: Advancing Equitable Pediatric Respiratory Care.",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Dr. Maninder Dhaliwal (Moderator)\n\nCo Panelists\nDr. Rajiv Uttam        \nDr. Sagar lad        \nDr. Shekhar Venkatraman        \nDr. Mounika Reddy",
        place: "Hall A",
        institution: " "
      },
      {
        title: "PANEL DISCUSSION - HYPOXEMIA, REFRACTORY HYPOXEMIA\nAdvanced Ventilation",
        startTime: "6/11/2025 11:30 AM",
        endTime: "6/11/2025 12:30 AM",
        role: "Workshop Faculty",
        description: "Moderator: Dr. Yashwanth Reddy \n Panelists: \nDr. Sekhar Venkatraman, \nDr. Nameet Jerath, \nDr. Kalyan, \nDr. Prabas Prasun",
        place: " ",
        institution: "KIMS Cuddles Secunderabad"
      },
      {
        title: "RECRUITMENT METHODS AND PRONING\nAdvanced Ventilation",
        startTime: "6/11/2025 3:40 PM",
        endTime: "6/11/2025 4:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "priyabrata.picu@gmail.com": {
    facultyName: "Dr Priyabrata Panda",
    email: "priyabrata.picu@gmail.com",
    sessions: [
      {
        title: "Interpreting Critical Labs in Suspected Metabolic Disease",
        startTime: "8/11/2025 1:00 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Panelist",
        description: "Dr Banani Poddar (Moderator )\nCo Panelists\nDr Satish Deopujari \nDr Karunakar BP\nDr Dayanand Nakate\nDr. Shalu Gupta",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Smart Moves in the PICU",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 4:15 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "raghupaaa@gmail.com": {
    facultyName: "Dr. Raghupathi R",
    email: "raghupaaa@gmail.com",
    sessions: [
      {
        title: "Rescue, Restore, Rewire: Protecting the Pediatric  Brain After Trauma and Arrest.",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr Vinayak Patki(Moderator)\nCo panelists\nDr Sheikh Minhaj\nDr Shrishu Kamath\nDr Sibabrata Patnaik\nDr Sudeep K C",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Airway :Bag and Mask/ Intubation/ LMA & RSI\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "Cardiac Emergencies\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "vishnutej.pudi@gmail.com": {
    facultyName: "Dr Vishnu Tej",
    email: "vishnutej.pudi@gmail.com",
    sessions: [
      {
        title: "Innovation Over Infrastructure: Delivering Neurorehab in Our Real World.",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Moderator\nDr Kavita TK\n\nCo Panelists:\nDr Karen Ka Yan LEUNG\nDr Ririe\nDr. Prabhas Prasun Giri\nDr. Narayanan P",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "ramunivinay@gmail.com": {
    facultyName: "Dr. Vinay Ramuni",
    email: "ramunivinay@gmail.com",
    sessions: [
      {
        title: "Fluid, Not Flood: Smarter Resuscitation in the PICU\n",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr Mahesh Mohite (Moderator)\nCo panelists\nDr Manoj Chowdary\nDr John Adabie Appiah\nDr Mritunjay Pao\nDr Vinay Ramuni",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Hepatic flow decoded –VexUS , Venous & Portal patterns\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      }
    ]
  },
  "dr.shashwatm@gmail.com": {
    facultyName: "Dr Shashwat Mohanti",
    email: "dr.shashwatm@gmail.com",
    sessions: [
      {
        title: "Between Guidelines and Ground Reality: Talking to Families in Indian PICUs",
        startTime: "8/11/2025 12:30 PM",
        endTime: "8/11/2025 1:15 PM",
        role: "Panelist",
        description: "Dr. Puneet Pooni(Moderator)\n\nCo Panelists  \nDr Chirag Sethi       \nDr. Hariharan Seetharaman        \nDr. Kwame Boateng\nDr. Bakul Parikh",
        place: "Hall C",
        institution: " "
      },
      {
        title: "“Ambulance Darshan” –Inside the Beast: Ambulance Anatomy & Action Zone\nTransport ",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:15 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      },
      {
        title: "Intra-Hospital Rescue Run\nTransport ",
        startTime: "6/11/2025 12:45 PM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "dr_jvrao@yahoo.co.in": {
    facultyName: "Dr JV Rao",
    email: "dr_jvrao@yahoo.co.in",
    sessions: [
      {
        title: "Dengue Gone Wild: Navigating the Complications",
        startTime: " ",
        endTime: " ",
        role: "Panelist",
        description: "Moderator \nDr Rachna Sharma\n\nPanelists\nDr Satish Ghanta\nDr Daisy Khera\nDr Rujipat\nDr Sameer Sadawarte\n",
        place: " ",
        institution: " "
      }
    ]
  },
  "sujithkumar1010@gmail.com": {
    facultyName: "Dr Sujith T",
    email: "sujithkumar1010@gmail.com",
    sessions: [
      {
        title: "Pus, Air, and Trouble: Stepwise Care in Necrotising Pneumonia",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Dr Pradeep Sharma (Moderator)\n\nCo Panelists       \nDr Rashmi Kapoor        \nDr Kaushik Maulik        \nDr Sebastian Gonzalez-Dambrauskas                \nDr Bijay Kumar Meher",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "avinashreddy@outlook.com": {
    facultyName: "Dr Avinash Reddy",
    email: "avinashreddy@outlook.com",
    sessions: [
      {
        title: "Friend, Foe, or Firefighting Tool?\nCRRT & Plasmapheresis in Pediatric ALF",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr Jolly Chandaran (Moderator)        \nCo Panelists \nDr Uma Ali\nDr Shalu Gupta\nDr Vasudha\nDr. Deepankar Bansal",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "ale285samagna@gmail.com": {
    facultyName: "Dr Alekhya Reddy R",
    email: "ale285samagna@gmail.com",
    sessions: [
      {
        title: "Keeping the Calm: Practical Challenges in Sedating the ECMO Child",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:00 PM",
        role: "Panelist",
        description: "Moderator\nDr Parag Dakate \n\nCo- Panelists:\nDr Madhudhar Chegondi\nDr Nanda Kishore\nDr Prashant Mitharwal\nDr Deepak R",
        place: "Hall A",
        institution: " "
      },
      {
        title: "CRRT and SLED",
        startTime: "6/11/2025",
        endTime: " ",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles, Kondapur"
      }
    ]
  },
  "paedbalu8@gmail.com": {
    facultyName: "Dr Bala Krishna Reddy P",
    email: "paedbalu8@gmail.com",
    sessions: [
      {
        title: "Electrolyte Emergencies in the PICU: Algorithms, Controversies, and Pitfalls",
        startTime: "9/11/2025 3:00 PM",
        endTime: "9/11/2025 3:45 PM",
        role: "Panelist",
        description: "Dr.\nLalitha AV (Moderator)\nCo panelists\nDr. Nitish Upadhaya\nDr. Atsushi Kawaguchi\nDr. Amit Vij\nDr Suresh Kumar Panugati",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "koyalachandu@gmail.com": {
    facultyName: "Dr Chandra Shekar",
    email: "koyalachandu@gmail.com",
    sessions: [
      {
        title: "Transfuse or Tolerate? Finding the Balance in Pediatric Critical Care",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Moderator \nDr Lakshmi Shobhavat\n\nCo Panelist\nDr Anand Bhutada\nDr Chetan Mundada\nDr Abhijeet Chaudhary\nDr Lalit Takia",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "sneharaj_t@yahoo.co.in": {
    facultyName: "Dr Sneha T",
    email: "sneharaj_t@yahoo.co.in",
    sessions: [
      {
        title: "Burnout in PICU: Caring for the Caring Team",
        startTime: "9/11/2025 3:30 PM",
        endTime: "9/11/2025 4:15 PM",
        role: "Panelist",
        description: "Moderator \nDr Bala Ramachandaran\n\nCo Panelists\nDr Avishek Poddar\nDr Muthuvel\nDr Asha Shenoi\nDr Neeraj Verma",
        place: "Hall B",
        institution: " "
      },
      {
        title: "PICU Procedures  (CVL)\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "Shock Cases\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "sanjaysrirampur@yahoo.com": {
    facultyName: "Dr Sanjay Srirampur",
    email: "sanjaysrirampur@yahoo.com",
    sessions: [
      {
        title: "From Rote to innovation - pediatricians for digital & AI world",
        startTime: "7/11/2025 1:45 PM",
        endTime: "7/11/2025 2:00 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Innovators of Tomorrow: Pediatric Critical Care DM/DrNB Thesis Awards",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drsridharnl@gmail.com": {
    facultyName: "Dr N L Sridhar",
    email: "drsridharnl@gmail.com",
    sessions: [
      {
        title: "Saving Lives, \nSaving Costs: Can We Do Both?",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr Nirmal Choraria (Moderator)\nCo Panelists\nDr jalani Basha\nDr Kshama Daphtary\nDr Akash Bang\nDr. Somnath Gorain",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Pediatric critical care at Legal cross routes",
        startTime: "7/11/2025 2:30 PM",
        endTime: "7/11/2025 3:10 PM",
        role: "Panelist",
        description: "Moderator: Dr Sameer Sadawarte\nPanelists:\nDr Amita Kaul\nDr Manju Kedarnath\nDr Vinayak Pataki\nDr Amar Singh (9057161357)",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Navigating Neurocritical Challenges: Advanced Perspectives in Pediatric Care",
        startTime: "7/11/2025 10:30 AM",
        endTime: "7/11/2025 12:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "ravimooli59@gmail.com": {
    facultyName: "Dr Ravi Mooli",
    email: "ravimooli59@gmail.com",
    sessions: [
      {
        title: "When Not to Intubate: Grey Zones in Airway Management",
        startTime: "9/11/2025 4:25 PM",
        endTime: "9/11/2025 4:35 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Common Pediatric Emergencies\n A.Anaphylaxis\n B.Diabetic ketoacidosis\n Drowning\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      },
      {
        title: "The Practical PICU",
        startTime: "8/11/2025 12:45 PM",
        endTime: "8/11/2025 5:50 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "akunurishalini@gmail.com": {
    facultyName: "Dr Shalini A",
    email: "akunurishalini@gmail.com",
    sessions: [
      {
        title: "Inubated asthmatics-do you use ZERO PEEP?",
        startTime: "9/11/2025 4:35 PM",
        endTime: "9/11/2025 4:45 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "kanumala.udaykumar@gmail.com": {
    facultyName: "Dr Uday Kumar P",
    email: "kanumala.udaykumar@gmail.com",
    sessions: [
      {
        title: "Stop!\nWhen Not to Give Antibiotics",
        startTime: "9/11/2025 5:05 PM",
        endTime: "9/11/2025 5:15 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drraghuvamsi@gmail.com": {
    facultyName: "Dr Raghu Vamsi",
    email: "drraghuvamsi@gmail.com",
    sessions: [
      {
        title: "Ouch Matters: Quick Guide to Pain Management in Critically Ill Children",
        startTime: "9/11/2025 5:25 PM",
        endTime: "9/11/2025 5:35 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "jbhaasha@gmail.com": {
    facultyName: "Dr Jilani Basha",
    email: "jbhaasha@gmail.com",
    sessions: [
      {
        title: "Saving Lives, Saving Costs: Can We Do Both?",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Moderator\nDr Nirmal Choraria \n\nPanelists\nDr Somnath Gorain\nDr Jalani Basha\nDr Kshama Daphtary\nDr Akash Bang\nDr N L Sridhar",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Abdominal Ultrasound & e – FAST.\nPOCUS (Basic)",
        startTime: "6/11/2025 12:30 PM",
        endTime: "6/11/2025 1:00 PM",
        role: "Local coordinator",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      }
    ]
  },
  "lokisiri@gmail.com": {
    facultyName: "Dr Sirisha",
    email: "lokisiri@gmail.com",
    sessions: [
      {
        title: "Critical Care of Cellular Therapies in Transplant & Oncology (CAR-T, Immunotherapies)",
        startTime: "7/11/2025 9:30 AM",
        endTime: "7/11/2025 9:45 AM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "prabhatm7@yahoo.com": {
    facultyName: "Dr Prabhat Maheshwari",
    email: "prabhatm7@yahoo.com",
    sessions: [
      {
        title: "The Race Against Time: Early Recognition in \"Malignancy-Induced Cytokine Release Syndrome”",
        startTime: "9/11/2025 9:30 AM",
        endTime: "9/11/2025 9:45 AM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Free Paper",
        startTime: "9/11/2025 8:00 AM",
        endTime: "9/11/2025 9:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "Vasu.winny@gmail.com": {
    facultyName: "Dr Vasudha",
    email: "Vasu.winny@gmail.com",
    sessions: [
      {
        title: "Pediatric Environmental Hazards\n A.Burns\n B.Envenomation\n C.Poisoning – Decontamination\n D.Transport of sick child\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 3:15 PM",
        endTime: "6/11/2025 4:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      },
      {
        title: "Friend, Foe, or Firefighting Tool?\nCRRT & Plasmapheresis in Pediatric ALF",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr Jolly Chandaran (Moderator)        \nCo Panelists \nDr Uma Ali\nDr Shalu Gupta\nDr Avinash Reddy\nDr. Deepankar Bansal",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "pediadramar25@gmail.com": {
    facultyName: "Prof Subha Narayan Rath",
    email: "pediadramar25@gmail.com",
    sessions: [
      {
        title: "Newer Technology and Innovation in shaping future of critical care",
        startTime: "7/11/2025 2:00 PM",
        endTime: "7/11/2025 2:15 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "baswarajt@gmail.com": {
    facultyName: "Dr Basavaraj Tandur",
    email: "baswarajt@gmail.com",
    sessions: [
      {
        title: "Building collaborative networks for PICU",
        startTime: "7/11/2025 2:15 PM",
        endTime: "7/11/2025 2:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Technological Advances and Recent innovations in Pediatric Critical Care",
        startTime: "7/11/2025 1:30 PM",
        endTime: "7/11/2025 3:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "drharishkumar@rediffmail.com": {
    facultyName: "Dr. Harish Kumar H",
    email: "drharishkumar@rediffmail.com",
    sessions: [
      {
        title: "Beyond Consent: Navigating Ethical Minefields in Pediatric Research",
        startTime: " ",
        endTime: " ",
        role: "Panelist",
        description: "Moderator\nDr Karthik Narayanan\n\nPanelists\nDr Bhakti Sarangi\nDr Michael Canarie\nDr Yasser Kazzaz\nDr Sibabrata Patnaik",
        place: " ",
        institution: " "
      }
    ]
  },
  "dr.swamy.dara@gmail.com": {
    facultyName: "Dr Daraswamy",
    email: "dr.swamy.dara@gmail.com",
    sessions: [
      {
        title: "Paediatric Delirium and its confounders\nPICU Liberation",
        startTime: "6/11/2025 9:50 AM",
        endTime: "6/11/2025 10:10 AM",
        role: "Local coordinator",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      },
      {
        title: "Workstation 4 – Ward rounds and planning for a child with delirium\nPICU Liberation",
        startTime: "6/11/2025 1:50 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "Local coordinator",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      }
    ]
  },
  "mjshree64@gmail.com": {
    facultyName: "Dr. Jayashree Muralidharan",
    email: "mjshree64@gmail.com",
    sessions: [
      {
        title: "Welcome and Overview\nCLINICAL RESEARCH",
        startTime: "6/11/2025 8:30 AM",
        endTime: "6/11/2025 8:45 AM",
        role: "National coordinator",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      },
      {
        title: "Clinical trials\nCLINICAL RESEARCH",
        startTime: "6/11/2025 11:45 PM",
        endTime: "6/11/2025 12:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      },
      {
        title: "Closing remarks\nCLINICAL RESEARCH",
        startTime: "6/11/2025 4:20 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      }
    ]
  },
  "jakkasrinu@yahoo.com": {
    facultyName: "Srinivas Jakka",
    email: "jakkasrinu@yahoo.com",
    sessions: [
      {
        title: "Upper airway pathologies\nBronchoscopy",
        startTime: "6/11/2025 11:15 AM",
        endTime: "6/11/2025 11:45 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Flexible bronchoscopy\nBronchoscopy",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      }
    ]
  },
  "lsumanpgi@gmail.com": {
    facultyName: "DR. SUMAN L",
    email: "lsumanpgi@gmail.com",
    sessions: [
      {
        title: "L3: How do I prescribe IHD & PIKRT\nCRRT and SLED",
        startTime: "6/11/2025 10:00 AM",
        endTime: "6/11/2025 10:30 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles, Kondapur"
      },
      {
        title: "W1: IHD & PIKRT-\nCase Based Approach\nCRRT and SLED",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:10 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "prmuthiah@gmail.com": {
    facultyName: "Dr Muthiah Periyakaruppan",
    email: "prmuthiah@gmail.com",
    sessions: [
      {
        title: "Ice Breaking Game\nNursing Respiratory Care",
        startTime: "6/11/2025 10:00 AM",
        endTime: "6/11/2025 10:30 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Ventilator Alarms Game\nNursing Respiratory Care",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:00 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Art of nebulisation in children with Asthma\nNursing Respiratory Care",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      }
    ]
  },
  "drkrkrishna@gmail.com": {
    facultyName: "Dr Ramakrishna",
    email: "drkrkrishna@gmail.com",
    sessions: [
      {
        title: "Station 3: Real Cases, Real Solutions: Navigating Pediatric Cardiac Crises\nCardiac Critical Care",
        startTime: "6/11/2025 1:15 PM",
        endTime: "6/11/2025 4:15 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      }
    ]
  },
  "ravindergoudjangampally@gmail.com": {
    facultyName: "Dr RAVINDER",
    email: "ravindergoudjangampally@gmail.com",
    sessions: [
      {
        title: "Workstation 2: Nursing care paln of a child on Non-invasive respiratory support\nNursing Respiratory Care",
        startTime: "6/11/2025 11:00 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "ABG at bedside – What nurse should know?\nNursing Respiratory Care",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      }
    ]
  },
  "thanigavelurajeswari@gmail.com": {
    facultyName: "Mrs T Rajeshwari",
    email: "thanigavelurajeswari@gmail.com",
    sessions: [
      {
        title: "Failure to prepare is preperation to fail\nTriage and Emergency Preparedness\nCase based Discussion\nPCCN",
        startTime: "6/11/2025 3:10 PM",
        endTime: "6/11/2025 3:40 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Spotting the Signs\nSimulation scenario\non recognition of a sick child\n(Neuro - Poly Trauma)\nPCCN",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 3:46 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Command Code Blue:\nHigh Quality CPR\nAsystole and Shockable rhythm with\nCRM\nPCCN",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "Saipraneeth1114@gmail.com": {
    facultyName: "Dr Sai Praneeth",
    email: "Saipraneeth1114@gmail.com",
    sessions: [
      {
        title: "Stack the Cheese, Stop the squeak\nUnderstanding Medication errors to prevent it\nBreakout rooms\nPCCN",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Command Code Blue:\nHigh Quality CPR\nAsystole and Shockable rhythm with\nCRM\nPCCN",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Control in Chaos\nPrinciples of Crisis Communication\nISBAR and CRM\nPCCN",
        startTime: "6/11/2025 3:45 PM",
        endTime: "6/11/2025 5:15 PM",
        role: " ",
        description: " ",
        place: " ",
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
