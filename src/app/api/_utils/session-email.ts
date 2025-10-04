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
  "drsskrishna@yahoo.co.in": {
    facultyName: "Dr Srikrishna",
    email: "drsskrishna@yahoo.co.in",
    sessions: [
      {
        title: "Namaste & Nurture” – Pre-briefing & Ice-Breaker\nTransport",
        startTime: "6/11/2025 8:00 AM",
        endTime: "6/11/2025 8:30 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      },
      {
        title: "“Dil, Dhadkan & Data” – Monitoring on \nthe Move and checklists\nTransport",
        startTime: "6/11/2025 10:45 AM",
        endTime: "6/11/2025 11:15 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Intra-Hospital Rescue Run\nTransport",
        startTime: "6/11/2025 12:45 PM",
        endTime: "6/11/2025 1:30 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      },
       {
        title: "Breathless Battles: Viral Pneumonia That Won’t Back Down: What's the Trend in Pediatric Viral Pneumonia?",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "ankursabode@yahoo.co.in": {
    facultyName: "Dr Ankur Agarwal",
    email: "ankursabode@yahoo.co.in",
    sessions: [
      {
        title: "Analgesia and Sedation\nBPICC",
        startTime: "3/11/2025 12:15 PM",
        endTime: "3/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: "ONLINE LECTURES",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "PICU Procedures  (CVL)\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
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
  "prp2610@gmail.com": {
    facultyName: "Dr Raghu Praneeth",
    email: "prp2610@gmail.com",
    sessions: [
      {
        title: "CPAP/ HFNC\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "Neuro Cases\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "nnbrishti@gmail.com": {
    facultyName: "Dr Nandhini Sinha Roy",
    email: "nnbrishti@gmail.com",
    sessions: [
      {
        title: "Neurological Emergencies\n A.Status Epilepticus(20min)\n B.TBI management(20min)\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 10:00 AM",
        endTime: "6/11/2025 10:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      }
    ]
  },
  "manivachagan2001@yahoo.co.in": {
    facultyName: "Dr Manivachagan",
    email: "manivachagan2001@yahoo.co.in",
    sessions: [
      {
        title: "Neurological Emergencies\n A.Status Epilepticus(20min)\n B.TBI management(20min)\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 10:00 AM",
        endTime: "6/11/2025 10:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      },
      {
        title: "POCUS for shock and lungs – Hands on\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 4:00 PM",
        endTime: "6/11/2025 4:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      }
    ]
  },
  "raman.sharma1826@gmail.com": {
    facultyName: "Dr Raman Sharma",
    email: "raman.sharma1826@gmail.com",
    sessions: [
      {
        title: "“Bag of Life: Transport Kit Showdown\nTransport ",
        startTime: "6/11/2025 10:15 AM",
        endTime: "6/11/2025 10:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      },
      {
        title: "Breathing on the Go – Respiratory Rescue\nTransport ",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 3:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drfebnarahiman@gmail.com": {
    facultyName: "Dr Febna Rehman",
    email: "drfebnarahiman@gmail.com",
    sessions: [
      {
        title: "“Dil, Dhadkan \n& Data” – Monitoring on the Move and checklists\nTransport ",
        startTime: "6/11/2025 10:45 AM",
        endTime: "6/11/2025 11:15 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      },
      {
        title: "Transport Hacks & Crisis Pearls: Lessons from the FrontlinesTransport \nTransport",
        startTime: "6/11/2025 11:45 AM",
        endTime: "6/11/2025 12:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Trauma Transport Takedown (Neuro Edition)\nTransport",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 2:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drnitinchawlapeder@gmail.com": {
    facultyName: "Dr Nitin",
    email: "drnitinchawlapeder@gmail.com",
    sessions: [
      {
        title: "“Bol Bachchan SBAR” – Handover without Hangover\nTransport ",
        startTime: "6/11/2025 11:15 AM",
        endTime: "6/11/2025 11:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      },
      {
        title: "Breathing on the Go – Respiratory Rescue\nTransport ",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 3:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "avinashreddy805@gmail.com": {
    facultyName: "Dr Avinash Reddy P",
    email: "avinashreddy805@gmail.com",
    sessions: [
      {
        title: "W1: IHD & PIKRT-\nCase Based Approach\nCRRT & SLED",
        startTime: "6/11/2025 12:45 PM",
        endTime: "6/11/2025 1:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      },
      {
        title: "W3: RRT on ECMO & Tandem Therapies\nCRRT & SLED",
        startTime: "6/11/2025 3:50 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "brmounikaharish@gmail.com": {
    facultyName: "Dr Mounika M",
    email: "brmounikaharish@gmail.com",
    sessions: [
      {
        title: "Panel Discussion: CKRT: When, What & How\nCRRT & SLED",
        startTime: "6/11/2025 1:15 PM",
        endTime: "6/11/2025 1:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      },
      {
        title: "W1: IHD & PIKRT-\nCase Based Approach\nCRRT & SLED",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:10 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "dkrishnac7@gmail.com": {
    facultyName: "Dr Krishna Chaitanya",
    email: "dkrishnac7@gmail.com",
    sessions: [
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
        title: "HSCT: Navigating HSCT Challenges",
        startTime: "7/11/2025 8:30 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Panelist",
        description: "Moderator\nDr Indira Jayakumar , \n\nPanelists\nDr Reshma A ,\nDr Abdul Rauf, \nDr Sanket R (CMC Vellore)\nDr Abhinav",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "sudhach83@rediffmail.com": {
    facultyName: "Dr Sudha Chandelia",
    email: "sudhach83@rediffmail.com",
    sessions: [
      {
        title: "Literature reviews\nCLINICAL RESEARCH",
        startTime: "6/11/2025 9:15 AM",
        endTime: "6/11/2025 9:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      }
    ]
  },
  "rajakumarps@gmail.com": {
    facultyName: "Dr Rajakumar",
    email: "rajakumarps@gmail.com",
    sessions: [
      {
        title: "Workstation 4: Nursing care plan of a ventilated child\nNursing Respiratory Care",
        startTime: "6/11/2025 11:00 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Art of nebulisation in children with Asthma\nNursing Respiratory Care",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      }
    ]
  },
  "joshigurudutt@yahoo.com": {
    facultyName: "Dr Gurudutt",
    email: "joshigurudutt@yahoo.com",
    sessions: [
      {
        title: "Workstation 2: Nursing care paln of a child \non Non-invasive respiratory support\nNursing Respiratory Care",
        startTime: "6/11/2025 11:00 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "ABG at bedside – What nurse should know?\nNursing Respiratory Care",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      }
    ]
  },
  "drsbkn@gmail.com": {
    facultyName: "Dr Bharath Kumar Chennai",
    email: "drsbkn@gmail.com",
    sessions: [
      {
        title: "Introduction to clinical research – PICO, study designs\nCLINICAL RESEARCH",
        startTime: "6/11/2025 8:45 AM",
        endTime: "6/11/2025 9:15 AM",
        role: "Workshop Faculty",
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
      }
    ]
  },
  "gudurukumar00@gmail.com": {
    facultyName: "Dr Vijayakumar",
    email: "gudurukumar00@gmail.com",
    sessions: [
      {
        title: "Bridges and Roadblocks in Thesis Writing: A Guide’s Perspective\nCLINICAL RESEARCH",
        startTime: "6/11/2025 4:00 PM",
        endTime: "6/11/2025 4:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      },
      {
        title: "Paediatric basic airway\nBronchoscopy",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Pedicriticon Keynotes",
        startTime: "7/11/2025 4:00 PM",
        endTime: "7/11/2025 5:00 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "19.vira@gmail.com": {
    facultyName: " ",
    email: "19.vira@gmail.com",
    sessions: [
      {
        title: "Literature reviews\nCLINICAL RESEARCH",
        startTime: "6/11/2025 9:15 AM",
        endTime: "6/11/2025 9:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      }
    ]
  },
  "sureshkumarpnd@gmail.com": {
    facultyName: "Dr Suresh Panda",
    email: "sureshkumarpnd@gmail.com",
    sessions: [
      {
        title: " ",
        startTime: "6/11/2025",
        endTime: " ",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "prathyushachowdary07@gmail.com": {
    facultyName: "Dr Pratyusha chowdary",
    email: "prathyushachowdary07@gmail.com",
    sessions: [
      {
        title: "Workstation 3: nursing preparation and participation for Modified RSI in emergency\nNursing Respiratory Care",
        startTime: "6/11/2025 11:00 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Simulation Scenario\nNursing Respiratory Care",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      }
    ]
  },
  "venkatreddymadireddy@gmail.com": {
    facultyName: "DR Venkat Ramana reddy",
    email: "venkatreddymadireddy@gmail.com",
    sessions: [
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
      }
    ]
  },
  "dikshithareddy47@gmail.com": {
    facultyName: "Dr Deekshitha",
    email: "dikshithareddy47@gmail.com",
    sessions: [
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
        institution: "Yashoda Hospital, Hitech \nCity"
      }
    ]
  },
  "caprisr20@gmail.com": {
    facultyName: "Dr Sachitra",
    email: "caprisr20@gmail.com",
    sessions: [
      {
        title: "Pre test- Kahoot\nPCCN",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      }
    ]
  },
  "356668@narayanahealth.org": {
    facultyName: "Mr Madhu",
    email: "356668@narayanahealth.org",
    sessions: [
      {
        title: "Pre test- Kahoot\nPCCN",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Stack the Cheese, Stop the squeak\nUnderstanding Medication errors to prevent it\nBreakout rooms\nPCCN",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "Workshop Faculty",
        description: "Online Session",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "From Chaos to Control\nRecognition and Management of Common Arrhythmia\nCase based Discussion\nPCCN",
        startTime: "6/11/2025 3:40 PM",
        endTime: "6/11/2025 4:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "rajeshwarirajendra1994@gmail.com": {
    facultyName: "Ms Rajeshwari R",
    email: "rajeshwarirajendra1994@gmail.com",
    sessions: [
      {
        title: "Back to Basics\nSystematic Assessment and\nidentification of sick kids\nPCCN",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:10 PM",
        role: "Workshop Faculty",
        description: "online Session 1",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Stack the Cheese, Stop the squeak\nUnderstanding Medication errors to prevent it\nBreakout rooms\nPCCN",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "Workshop Faculty",
        description: "Online Session 2",
        place: " ",
        institution: " "
      }
    ]
  },
  "varna6861@gmail.com": {
    facultyName: "Suvarna Kumari",
    email: "varna6861@gmail.com",
    sessions: [
      {
        title: "Ventilation & Vigilance: The Child at the Center\nEssential Care of Ventilated Child\nPCCN",
        startTime: "6/11/2025 3:10 PM",
        endTime: "6/11/2025 3:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Beyond the Machine Smooth and\nSecure:\nPreparation for Intubation with CRM , \nDOOPE , Prone Positioning,LMA\nPCCN",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Spotting the Signs\nSimulation scenario on\nrecognition of \na sick child\n(Hemodynamics & Respiratory)\nPCCN",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 3:46 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Fighting the Invisible Enemy\nInfection control and Waste disposal\nPCCN",
        startTime: "6/11/2025 3:45 PM",
        endTime: "6/11/2025 5:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "kabilan1508@gmail.com": {
    facultyName: "Kabilan KL",
    email: "kabilan1508@gmail.com",
    sessions: [
      {
        title: "Quality Matters Optimising Outcomes\nHigh quality CPR\nPCCN",
        startTime: "6/11/2025 3:10 PM",
        endTime: "6/11/2025 3:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Stack the Cheese, Stop the squeak\nUnderstanding Medication errors to prevent it\nBreakout rooms\nPCCN",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "itsmevidhya00@gmail.com": {
    facultyName: "Dr. Sri Vidya",
    email: "itsmevidhya00@gmail.com",
    sessions: [
      {
        title: "HIGH FREQUENCY OSCILLATORY VENTILATION\nAdvanced Ventilation",
        startTime: "6/11/2025 10:00 AM",
        endTime: "6/11/2025 10:20 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "PANEL DISCUSSION – AIRWAY OBSTRUCTION – ASTHMA, MALACIA\nAdvanced Ventilation",
        startTime: "6/11/2025 12:30 PM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: "Modaerator: Dr. Revanth Baineni\n Panelists: \nDr. Ramesh, \nDr. Sri Vidya, \nDr. Kiran, \nDr. Arpita Chattopadhyay",
        place: " ",
        institution: " "
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
  "Chattopadhyay.arpita@gmail.com": {
    facultyName: "Dr. Arpita Chattopadhyay",
    email: "Chattopadhyay.arpita@gmail.com",
    sessions: [
      {
        title: "TRANS PULMONARY PRESSURE MONITORING - ARE WE PEEPOPHOBIC??\nSimulation",
        startTime: "6/11/2025 11:00 AM",
        endTime: "6/11/2025 11:30 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "PANEL DISCUSSION – AIRWAY OBSTRUCTION – ASTHMA, MALACIA\nAdvanced Ventilation",
        startTime: "6/11/2025 12:30 PM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: "Modaerator: Dr. Revanth Baineni\n Panelists: \nDr. Ramesh, \nDr. Sri Vidya, \nDr. Kiran, \nDr. Arpita Chattopadhyay",
        place: " ",
        institution: " "
      },
      {
        title: "BRONCHOSCOPY IN PICU – BRONCHO-ALVEOLAR LAVAGE\nAdvanced Ventilation",
        startTime: "6/11/2025 4:20 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "mathew.reena@gmail.com": {
    facultyName: "Dr. Reena Mathew",
    email: "mathew.reena@gmail.com",
    sessions: [
      {
        title: "Hands on work stations:\nStation A-Knobs & Probes,ONSD\nStation B - Lung USG\nStation C- Cardiac USG/Fluid assessment/IVC/Vascular USG\nStation D- Abdominal USG &E-FAST\nPOCUS \n (Basic)",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      },
      {
        title: "Case Based discussion combining POCUS Modalities for a holistic assessment of the critically unwell child  \nPOCUS \n (Basic)",
        startTime: "6/11/2025 4:30 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      }
    ]
  },
  "drfaisalnahdi@gmail.com": {
    facultyName: "Dr. Faisal",
    email: "drfaisalnahdi@gmail.com",
    sessions: [
      {
        title: " ",
        startTime: "6/11/2025",
        endTime: " ",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "vikram.hirekerur@yahoo.com": {
    facultyName: "Dr. Vikram Hirekerpur",
    email: "vikram.hirekerur@yahoo.com",
    sessions: [
      {
        title: "Beyond Basics - Advanced Functional Echocardiography\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "Advanced Functional Echocardiography in shock management\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "ICD Placement guided by ultrasound\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      }
    ]
  },
  "rajasekhar.gogireddy@gmail.com": {
    facultyName: "Dr Rajshekar Reddy",
    email: "rajasekhar.gogireddy@gmail.com",
    sessions: [
      {
        title: "Technological Advances and Recent innovations in Pediatric Critical Care",
        startTime: "7/11/2025 1:30 PM",
        endTime: "7/11/2025 3:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Diagnosis of vascular thrombosis (DVT)\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      }
    ]
  },
  "abhik118815@gmail.com": {
    facultyName: "Dr. Abhinav KV",
    email: "abhik118815@gmail.com",
    sessions: [
      {
        title: "TCD – UTILITY - Autoregulation , CEREBROVASCCULAR REACTIVITY\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "TCD – UTILITY - Autoregulation\nPOCUS (Advanced)",
        startTime: "6/11/2025 9:40 AM",
        endTime: "6/11/2025 10:00 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "HSCT: Navigating HSCT Challenges",
        startTime: "7/11/2025 8:30 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Panelist",
        description: "Moderator\nDr Indira Jayakumar\n\nPanelists\nDr Reshma A \nDr Abdul Rauf\nDr Sanket R (CMC Vellore)\nDr Krishna Chaitanya ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "arvindkumarm.paed@gmail.com": {
    facultyName: "Dr. Aravind Kumar M",
    email: "arvindkumarm.paed@gmail.com",
    sessions: [
      {
        title: "Diagnosis of vascular thrombosis (DVT)\nPOCUS (Advanced)",
        startTime: "6/11/2025 9:40 AM",
        endTime: "6/11/2025 10:00 AM",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      }
    ]
  },
  "drsonaradiology@gmail.com": {
    facultyName: "Dr Sonam Shash",
    email: "drsonaradiology@gmail.com",
    sessions: [
      {
        title: "Normal & Abnormal GUT SONOLOGY in PICU\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "“Scan the Gut” – Normal Anatomy & Ultrasound Correlation – PROBE PLACEMET",
        startTime: "6/11/2025 11:20 PM",
        endTime: "6/11/2025 11:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "manpreetkaursaini@hotmail.com": {
    facultyName: "Ms. Manpreet Saini (PGI)",
    email: "manpreetkaursaini@hotmail.com",
    sessions: [
      {
        title: "Workstation 1 – Sedation and pain scoring\nPICU Liberation",
        startTime: "6/11/2025 12:00 PM",
        endTime: "6/11/2025 12:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      },
      {
        title: "Workstation 1: Mobilizing a ventilated child\nPICU Liberation",
        startTime: "6/11/2025 1:50 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      }
    ]
  },
  "mamathaullam4183@gmail.com": {
    facultyName: "Ms. Mamtha",
    email: "mamathaullam4183@gmail.com",
    sessions: [
      {
        title: "Workstation 2 – Spontaneous Breathing and Awakening trials\nPICU Liberation",
        startTime: "6/11/2025 12:20 PM",
        endTime: "6/11/2025 12:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      },
      {
        title: "Workstation 1: Mobilizing a ventilated child\nPICU Liberation",
        startTime: "6/11/2025 1:50 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      }
    ]
  },
  "drnaveen23@outlook.com": {
    facultyName: "Dr. Naveen Reddy",
    email: "drnaveen23@outlook.com",
    sessions: [
      {
        title: "Workstation 2 – Spontaneous Breathing and Awakening trials\nPICU Liberation",
        startTime: "6/11/2025 12:20 PM",
        endTime: "6/11/2025 12:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      },
      {
        title: "Workstation 3: Mobilising an adolescent/child post-sternotomy\nPICU Liberation",
        startTime: "6/11/2025 1:50 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      }
    ]
  },
  "ananthpojala@gmail.com": {
    facultyName: "Dr. Ananth",
    email: "ananthpojala@gmail.com",
    sessions: [
      {
        title: "Workstation 1 – Sedation and pain scoring\nPICU Liberation",
        startTime: "6/11/2025 12:00 PM",
        endTime: "6/11/2025 12:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      },
      {
        title: "Workstation 2: Respiratory strengthening exercises, mobilising children with neuromuscular diseases\nPICU Liberation",
        startTime: "6/11/2025 1:50 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      }
    ]
  },
  "deepumon004@gmail.com": {
    facultyName: "Mr. Deepu [S/N]",
    email: "deepumon004@gmail.com",
    sessions: [
      {
        title: "Workstation 1 – Sedation and pain scoring\nPICU Liberation",
        startTime: "6/11/2025 12:00 PM",
        endTime: "6/11/2025 12:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      },
      {
        title: "Workstation 3: Mobilising an adolescent/child post-sternotomy\nPICU Liberation",
        startTime: "6/11/2025 1:50 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      }
    ]
  },
  "satyajeetsahu2013@gmail.com": {
    facultyName: "Dr. Satyajit Sahu",
    email: "satyajeetsahu2013@gmail.com",
    sessions: [
      {
        title: "\"PICU Liberation – Small steps and Big leaps\nPICU Liberation",
        startTime: "6/11/2025 9:05 AM",
        endTime: "6/11/2025 9:25 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      }
    ]
  },
  "dr.muthu87@gmail.com": {
    facultyName: "Dr. Muthu Chidambaram",
    email: "dr.muthu87@gmail.com",
    sessions: [
      {
        title: "Abdominal Ultrasound & e – FAST.Nebulization Therapy with HFNC and NIV in Respiratory Distress Children\nIncluding Product Presentation -Aerogen Ltd.\nNon-Invasive Respiratory Support",
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
