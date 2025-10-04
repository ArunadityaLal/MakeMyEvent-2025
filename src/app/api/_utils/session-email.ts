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
  "mohangulla35@gmail.com": {
    facultyName: "Dr. Krishan Mohan Gulla",
    email: "mohangulla35@gmail.com",
    sessions: [
      {
        title: "CPR Meets Circuit: Is India Ready for the Leap?",
        startTime: "9/11/2025 1:15 PM",
        endTime: "9/11/2025 1:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "kshanad@gmail.com": {
    facultyName: "Dr. Kshama Daphtary",
    email: "kshanad@gmail.com",
    sessions: [
      {
        title: "Clots in the Crosshairs: Navigating VTE in the ICU",
        startTime: "8/11/2025 1:15 PM",
        endTime: "8/11/2025 1:30 PM",
        role: "Speaker",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Saving Lives, Saving Costs: Can We Do Both? (Agenda: Can Cost Of Care And Quality Go Hand In Hand? )",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr. Nirmal Choraria (Moderator)        \nCo Panelists\nDr. Somnath Gorain        \nDr. Jalani Basha      \nDr. Akash Bang\nDr N L Sridhar",
        place: "Hall C",
        institution: " "
      },
      {
        title: "“Yatra Begins!”\n– Fundamentals of Pediatric Transport\nTransport",
        startTime: "6/11/2025 8:30 AM",
        endTime: "6/11/2025 9:15 AM",
        role: " ",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "“Bol Bachchan SBAR” – Handover without Hangover\nTransport",
        startTime: "6/11/2025 11:15 AM",
        endTime: "6/11/2025 11:45 AM",
        role: " ",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Transport Hacks & Crisis Pearls: Lessons from the Frontlines\nTransport",
        startTime: "6/11/2025 11:45 AM",
        endTime: "6/11/2025 12:15 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Special Ops!\n(Air, ECMO & Infectious Cases)\nTransport",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 3:45 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "kundanmittal@hotmail.com": {
    facultyName: "Dr. Kundan Mittal",
    email: "kundanmittal@hotmail.com",
    sessions: [
      {
        title: "Pediatric Polytrauma: To Cut or Not to Cut?",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 12:30 PM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
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
  "lakshmishobhavat@gmail.com": {
    facultyName: "Dr. Lakshmi Shobhavat",
    email: "lakshmishobhavat@gmail.com",
    sessions: [
      {
        title: "Transfuse or Tolerate? Finding the Balance in Pediatric Critical Care",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Moderator",
        description: "\"Panelists\nDr. Abhijeet Chaudhary       \nDr. Anand Bhutada        \nDr. Chetan Mundada        \nDr. Lalit Takia\nDr Chandra Shekar",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "lalitpgims@gmail.com": {
    facultyName: "Dr. Lalit Takia",
    email: "lalitpgims@gmail.com",
    sessions: [
      {
        title: "Transfuse or Tolerate? Finding the Balance in Pediatric Critical Care",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Moderator \nDr Lakshmi Shobhavat\n\nCo Panelist\nDr Anand Bhutada\nDr Chetan Mundada\nDr Abhijeet Chaudhary\nDr Chandra \nShekar",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Focus on POCUS\n For Practicing Pediatrician\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 10:45 AM",
        endTime: "6/11/2025 11:15 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      }
    ]
  },
  "drlalitha03@gmail.com": {
    facultyName: "Dr. Lalita AV",
    email: "drlalitha03@gmail.com",
    sessions: [
      {
        title: "Pediatric respiratory critical care research and promoting the development of a research network in India- identifying key gaps",
        startTime: "7/11/2025 10:45 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Moderator\nDr Jhuma Sankar\n \nCo Panelist\nDr Martin Kneyber \nDr Anil Sachdev\nDr Praveen Khilnani \nDr Sunit Singhi",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Electrolyte Emergencies in the PICU: Algorithms, Controversies, and Pitfalls",
        startTime: "9/11/2025 3:00 PM",
        endTime: "9/11/2025 3:45 PM",
        role: "Moderator",
        description: "Panelists       \nDr. Suresh Kumar Panugati        \nDr. Nitish Upadhaya        \nDr. Atsushi Kawaguchi \nDr. Amit Vij\nDr Bala Krishna Reddy P",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "madhu_1511@yahoo.com": {
    facultyName: "Dr. Madhusudan S",
    email: "madhu_1511@yahoo.com",
    sessions: [
      {
        title: "Routine Neuroimaging in Pediatric Coma: CT vs. MRI as First-Line Modality?",
        startTime: "7/11/2025 10:45 AM",
        endTime: "7/11/2025 11:15 AM",
        role: "Debater - FOR MRI",
        description: "Co Debater\nDr. Jerin Sekhar - for CT",
        place: "Hall B",
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
      }
    ]
  },
  "mahesh.mohite180@gmail.com": {
    facultyName: "Dr. Mahesh Mohite",
    email: "mahesh.mohite180@gmail.com",
    sessions: [
      {
        title: "Fluid, Not Flood: Smarter Resuscitation in the PICU",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Moderator",
        description: "Panelists:\nDr Manoj Chowdary\nDr VSV Prasad\nDr John Adabie Appiah\nDr Mritunjay Pao\nDr Vinay Ramuni",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Anatomy of the tracheobronchial tree and variations\nBronchoscopy Workshop",
        startTime: "6/11/2025 10:45 AM",
        endTime: "6/11/2025 11:15 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Flexible bronchoscopy\nBronchoscopy Workshop",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Pedicriticon Keynotes",
        startTime: "8/11/2025 11:15 AM",
        endTime: "8/11/2025 12:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "docmsdhaliwal@gmail.com": {
    facultyName: "Dr. Maninder Dhaliwal",
    email: "docmsdhaliwal@gmail.com",
    sessions: [
      {
        title: "Global Lungs, Local Challenges: Advancing Equitable Pediatric Respiratory Care.",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Moderator",
        description: "Panelist\nDr. Rajiv Uttam        \nDr. Sagar lad        \nDr. Shekhar Venkatraman        \nDr. Mounika Reddy\nDr Yeshwanth Reddy",
        place: "Hall A",
        institution: " "
      },
      {
        title: "PICU Brain Buzzer",
        startTime: "7/11/2025 2:45 PM",
        endTime: "7/11/2025 3:45 PM",
        role: "Quiz master",
        description: "Co Quiz masters: \nDr Karthik Narayanan\nDr Farhan Shaikh\nDr Milind Jambagi",
        place: "Hall C",
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
  "sharmadrmanish@yahoo.co.in": {
    facultyName: "Dr. Manish Sharma",
    email: "sharmadrmanish@yahoo.co.in",
    sessions: [
      {
        title: "From Collapse to Comeback: Pediatric Cardiac Arrest through the Lens of Multidisciplinary Care",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr. Nameet Jerath (Moderator)         \nCo Panelists\nDr. Soonu Udani\nDr. Vinay Nadkarni        \nDr. Manu Sundaram\nDr. Milind Jambagi",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Breathless Battles: Viral Pneumonia That Won’t Back Down: What's the Trend in Pediatric Viral Pneumonia?",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Moderator",
        description: "Panelists:\nDr Bala Ramachandaran\nDr Anil Sachdeva\nDr Hiroshi Kurosawa\nDr Ranganath Iyer\nDr Modi Sujeeth Kumar",
        place: "Hall A",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Sterility and asepsis in bronchoscopy\nBronchoscopy",
        startTime: "6/11/2025 10:00 AM",
        endTime: "6/11/2025 10:15 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Paediatric difficult airway\nBronchoscopy",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "manjinderk75@gmail.com": {
    facultyName: "Ms Manjinder Kaur",
    email: "manjinderk75@gmail.com",
    sessions: [
      {
        title: "Plenary - PediCritiCon Keynotes",
        startTime: "7/11/2025 4:30 PM",
        endTime: "7/11/2025 5:00 PM",
        role: "Plenary",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "manjukedarnath@gmail.com": {
    facultyName: "Dr. Manju Kedarnath",
    email: "manjukedarnath@gmail.com",
    sessions: [
      {
        title: "Pediatric critical care at Legal cross routes",
        startTime: "7/11/2025 2:30 PM",
        endTime: "7/11/2025 3:10 PM",
        role: "Panelist",
        description: "Moderator: Dr Sameer Sadawarte\nPanelists:\nDr Amita Kaul\nDr Vinayak Pataki\nDr NL Sridhar\nDr Amar Singh ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Overview of course and\nIntro of Faculty and delegate\nPediatric critical care nursing (PCCN) workshop",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 1:45 PM",
        role: "National Coordinator",
        description: "Online Session",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Beyond the Beeps\nDaily Routine of an ICU Nurse and Crisis Resource\nManagement\nPediatric critical care nursing (PCCN) workshop",
        startTime: "6/11/2025 8:30 AM",
        endTime: "6/11/2025 9:10 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      },
      {
        title: "Stack the Cheese, Stop the squeak\nUnderstanding Medication errors to prevent it\nBreakout rooms\nPediatric critical care nursing (PCCN) workshop",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Spotting the Signs\nSimulation scenario on\nrecognition of a sick child\n(Hemodynamics & Respiratory)\nPediatric critical care nursing (PCCN) workshop",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 3:46 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Control in Chaos\nPrinciples of Crisis Communication\nISBAR and CRM\nPediatric critical care nursing (PCCN) workshop",
        startTime: "6/11/2025 3:45 PM",
        endTime: "6/11/2025 5:15 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Ice Breaking Game\nNursing Respiratory Care",
        startTime: "6/11/2025 10:00 AM",
        endTime: "6/11/2025 10:30 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Workstation 2: Nursing care paln of a child on Non-invasive respiratory support\nNursing Respiratory Care",
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
  "mehakbansal@yahoo.com": {
    facultyName: "Dr. Mehak Bansal",
    email: "mehakbansal@yahoo.com",
    sessions: [
      {
        title: "PediCritiCon Imaging Honors: Clinico-Radiology Case Awards",
        startTime: "7/11/2025 9:00 AM",
        endTime: "7/11/2025 9:45 AM",
        role: "Chairperson",
        description: "Judges\nDr. Matthew Kirschen\nDr. Rujipat",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Echo in Action: Real-Time Clarity for Real-Life Hemodynamics.",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Moderator \nDr Dhiren Gupta  \n\nCo Panelist:\nDr Neil C \nDr Swathi Rao\nDr Namita Ravikumar\nDr. Suchitra Ranjit\n",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Lung Ultrasound\nPOCUS (Basic)",
        startTime: "6/11/2025 9:45 AM",
        endTime: "6/11/2025 10:15 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      },
      {
        title: "Case Based discussion combining POCUS Modalities for a holistic assessment of the critically unwell child  \nPOCUS (Basic)",
        startTime: "6/11/2025 4:30 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      }
    ]
  },
  "drmihir09@gmail.com": {
    facultyName: "Dr. Mihir Sarkar",
    email: "drmihir09@gmail.com",
    sessions: [
      {
        title: "Acute Flaccid Paralysis in the PICU: GBS, Myelitis, or Something Else?",
        startTime: "7/11/2025 11:15 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Dr. Rohit Vohra (Moderator)\nCo Panelists\nDr.  Ramaling Loni\nDr. Mukesh Jain\nDr. Jesal Sheth\nDr. Suchitra D",
        place: "Hall B",
        institution: " "
      },
      {
        title: "High-Impact Simulation Design & Execution\nSimulation",
        startTime: "6/11/2025 11:45 AM",
        endTime: "6/11/2025 12:15 PM",
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
  "doc.mounikareddy@gmail.com": {
    facultyName: "Dr. Mounika Reddy",
    email: "doc.mounikareddy@gmail.com",
    sessions: [
      {
        title: "Global Lungs, Local Challenges: Advancing Equitable Pediatric Respiratory Care.",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Dr. Maninder Dhaliwal (Moderator)\n\nCo Panelists\nDr. Rajiv Uttam        \nDr. Sagar lad        \nDr. Shekhar Venkatraman        \nDr. Yeshwanth Reddy",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Surveys\nCLINICAL RESEARCH",
        startTime: "6/11/2025 9:45 AM",
        endTime: "6/11/2025 10:10 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      },
      {
        title: "Storms, Clots, and Crisis: Hemato-Onco Challenges in Pediatric Critical Care",
        startTime: "9/11/2025 9:00 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "mritunjaypao@yahoo.com": {
    facultyName: "Dr. Mritunjay Pao",
    email: "mritunjaypao@yahoo.com",
    sessions: [
      {
        title: "Fluid, Not Flood: Smarter Resuscitation in the PICU",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr. Mahesh Mohite (Moderator)        \n\nCo Panelists\nDr Manoj Chowdary\nDr. VSV Prasad        \nDr. John Adabie Appiah        \nDr Vinay Ramuni",
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
  "mukesh26.jain@gmail.com": {
    facultyName: "Dr. Mukesh Jain",
    email: "mukesh26.jain@gmail.com",
    sessions: [
      {
        title: "Acute Flaccid Paralysis in the PICU: GBS, Myelitis, or Something Else?",
        startTime: "7/11/2025 11:15 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Dr. Rohit Vohra (Moderator), \nCo Panelists\nDr.  Ramaling Loni, \nDr. Mihir Sarkar, \nDr. Jesal Sheth\nDr. Suchitra D",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "mbaalaaji@yahoo.com": {
    facultyName: "Dr. Mullai Baalaji",
    email: "mbaalaaji@yahoo.com",
    sessions: [
      {
        title: "Autoimmune Encephalitis in Children: Critical Care Perspectives",
        startTime: "7/11/2025 10:30 AM",
        endTime: "7/11/2025 10:45 AM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Pre test\nECMO",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:30 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO\nPanel Discussion - Pediatric VV ECMO - Challenges and Ethical considerations",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:20 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO\nTroubleshooting & Emergency Scenarios - Power failure, Air in Circuit , Flow disturbances, Circuit change, Component change , etc",
        startTime: "6/11/2025 10:20 AM",
        endTime: "6/11/2025 1:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO\nPost test",
        startTime: "6/11/2025 3:20 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO\nWeaning and Trial off in pediatric ECMO",
        startTime: "6/11/2025 5:20 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      }
    ]
  },
  "rmv2210@gmail.com": {
    facultyName: "Dr. Muthuvel",
    email: "rmv2210@gmail.com",
    sessions: [
      {
        title: "Burnout in PICU: Caring for the Caring Team",
        startTime: "9/11/2025 3:30 PM",
        endTime: "9/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr. Bala Ramachandaran(Moderator)\n\nCo Panelists\nDr. Avishek Poddar          \nDr. Neeraj Verma        \nDr. Asha Shenoi\nDr Sneha T",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Bag of Life: Transport Kit Showdown\nTransport ",
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
  "dr_njerath@yahoo.com": {
    facultyName: "Dr. Nameet Jerath",
    email: "dr_njerath@yahoo.com",
    sessions: [
      {
        title: "From Collapse to Comeback: Pediatric Cardiac Arrest through the Lens of Multidisciplinary Care",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Moderator",
        description: "Panelists\nDr. Soonu Udani\nDr. Vinay Nadkarni        \nDr. Manu Sundaram\nDr. Manish Sharma\nDr Milind Jambagi",
        place: "Hall A",
        institution: " "
      },
      {
        title: "PANEL DISCUSSION - HYPOXEMIA, REFRACTORY HYPOXEMIA\nAdvanced Ventilation",
        startTime: "6/11/2025 11:30 AM",
        endTime: "6/11/2025 12:30 PM",
        role: "National Coordinator",
        description: "Moderator: Dr. Yashwanth Reddy\n \n Panelists: \nDr. Sekhar Venkatraman, \nDr. Nameet Jerath, \nDr. Kalyan, \nDr. Prabas Prasun Giri",
        place: " ",
        institution: "KIMS Cuddles Secunderabad"
      },
      {
        title: "HOW DO WE WEAN FROM VENTILATION – DIFFICULT WEAN\nAdvanced Ventilation",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 2:20 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "AEROSOL ADMINISTRATION IN VENTILATION AND POSTURAL PHYSIOTHERAPY\nAdvanced Ventilation",
        startTime: "6/11/2025 5:00 PM",
        endTime: "6/11/2025 5:40 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "namitu.ravi@gmail.com": {
    facultyName: "Dr. Namita Ravikumar",
    email: "namitu.ravi@gmail.com",
    sessions: [
      {
        title: "Echo in Action: Real-Time Clarity for Real-Life Hemodynamics.",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Moderator \nDr Dhiren Gupta  \n\nPanelist:\nDr Mehak Bansal\nDr Neil C \nDr Swathi Rao\nDr. Suchitra Ranjit",
        place: "Hall B",
        institution: " "
      },
      {
        title: "BIPAP Quick Hits: Setting Up for Success",
        startTime: "9/11/2025 1:05 PM",
        endTime: "9/11/2025 1:05 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Workstation 2 – Spontaneous Breathing and Awakening trials\nPICU Liberation",
        startTime: "6/11/2025 12:20 PM",
        endTime: "9/11/2025 12:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      },
      {
        title: "Mobilisation is safe – Not a myth\nPICU Liberation",
        startTime: "6/11/2025 1:20 PM",
        endTime: "6/11/2025 1:50 PM",
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
  "vnkkumar@yahoo.com": {
    facultyName: "Dr. Nanda Kishore",
    email: "vnkkumar@yahoo.com",
    sessions: [
      {
        title: "Keeping the Calm: Practical Challenges in Sedating the ECMO Child",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:00 PM",
        role: "Panelist",
        description: "Dr. Parag Dakate (Moderator)        \n\nCo Panelists\nDr Prashanth Mitharwal\nDr Madhudhar Chegondi\nDr Alekhya Reddy R\nDr Deepak R  ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Weaning and Decannulation\nECMO",
        startTime: "6/11/2025 10:20 AM",
        endTime: "6/11/2025 1:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO\nSimulation scenarios - Case based group discussion",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 3:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO\nPediatric ECMO and Finances - Indian context",
        startTime: "6/11/2025 4:40 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
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
  "drnarayananp@gmail.com": {
    facultyName: "Dr. Naryanan P",
    email: "drnarayananp@gmail.com",
    sessions: [
      {
        title: "Innovation Over Infrastructure: Delivering Neurorehab in Our Real World.",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Moderator\nDr Kavita TK\n\nCo Panelists:\nDr Karen Ka Yan LEUNG\nDr Ririe\nDr. Prabhas Prasun Giri\nDr Vishnu Tej",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Crack the Cardiac Code: Applied Physiology Made Simple",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 8:20 AM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "CLINICAL RESEARCH\nHow to write a protocol",
        startTime: "6/11/2025 12:20 PM",
        endTime: "6/11/2025 12:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      }
    ]
  },
  "neerajverma1957@yahoo.com": {
    facultyName: "Dr. Neeraj Verma",
    email: "neerajverma1957@yahoo.com",
    sessions: [
      {
        title: "Burnout in PICU: Caring for the Caring Team",
        startTime: "9/11/2025 3:30 PM",
        endTime: "9/11/2025 4:15 PM",
        role: "Panelist",
        description: "Moderator \nDr Bala Ramachandaran\n\nCo Panelists\nDr Avishek Poddar\nDr Muthuvel\nDr Asha Shenoi\nDr Sneha T",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "drneil.cs@gmail.com": {
    facultyName: "Dr. Neil C",
    email: "drneil.cs@gmail.com",
    sessions: [
      {
        title: "Echo in Action: Real-Time Clarity for Real-Life Hemodynamics.",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Moderator: \nDr Dhiren Gupta\nCo-Panelists\nDr. Mehak Bansal \nDr. Swathi Rao \nDr. Namita Ravikumar\nDr. Suchitra Ranjit",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "nirmal.choraria@nirmalhospitals.in": {
    facultyName: "Dr. Nirmal Choraria",
    email: "nirmal.choraria@nirmalhospitals.in",
    sessions: [
      {
        title: "Saving Lives, Saving Costs: Can We Do Both?",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Moderator",
        description: "Panelists:\nDr Somnath Gorain\nDrJalani Basha\nDr Kshama Daphtary\nDr Akash Bang\nDr N L Sridhar",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Buying Smart: Equipping Your PICU for Function, Not Fashion",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 3:15 PM",
        role: "Panelist",
        description: "Moderator \nDr VSV Prasad \n\nCo Panelists\nDr G. Ramesh \nDr Rafiq Ahmed\nDr Anand Buthada \nDr Preetam                    ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "India’s PICU Data Story",
        startTime: "8/11/2025 12:30 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Chairperson",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "niteshupadhyay22@gmail.com": {
    facultyName: "Dr. Nitish Upadhaya",
    email: "niteshupadhyay22@gmail.com",
    sessions: [
      {
        title: "Electrolyte Emergencies in the PICU: Algorithms, Controversies, and Pitfalls",
        startTime: "9/11/2025 3:00 PM",
        endTime: "9/11/2025 3:45 PM",
        role: "Panelist",
        description: "Dr. Lalitha AV (Moderator)\nCo Panelists     \nDr. Suresh Kumar Panugati        \nDr. Amit Vij       \nDr. Atsushi Kawaguchi        \nDr Bala Krishna Reddy P",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Flash Talks: PICU Dogma Disrupted",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:15 PM",
        role: "Chairperson",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "paggy4u@gmail.com": {
    facultyName: "Dr. Parag Dakate",
    email: "paggy4u@gmail.com",
    sessions: [
      {
        title: "Management of Complications related to blood based dialysis in PICU",
        startTime: "7/11/2025 2:15 PM",
        endTime: "7/11/2025 3:00 PM",
        role: "Panelist",
        description: "Dr. Sateesh Ponnarneni (Moderator) \nCo Panelists\nDr. Raghad Abdwani, \nDr. Sumant Patil, \nDr. Saumen Meur \nDr. Rohit Bhowmick",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Keeping the Calm: Practical Challenges in Sedating the ECMO Child",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:00 PM",
        role: "Moderator",
        description: "Panelists:\nDr Prashanth Mitharwal\nDr Madhudhar Chegondi\nDr Nanda Kishore\nDr Alekhya Reddy R",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drprabhasgiri@gmail.com": {
    facultyName: "Dr. Prabhas Prasun Giri",
    email: "drprabhasgiri@gmail.com",
    sessions: [
      {
        title: "Innovation Over Infrastructure: Delivering Neurorehab in Our Real World.",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Moderator\nDr Kavita TK\n\nCo Panelists:\nDr Karen Ka Yan LEUNG\nDr Ririe\nDr Narayanan P\nDr Vishnu Tej",
        place: "Hall B",
        institution: " "
      },
      {
        title: "PANEL DISCUSSION - HYPOXEMIA, REFRACTORY HYPOXEMIA\nAdvanced Ventilation",
        startTime: "6/11/2025 11:30 AM",
        endTime: "6/11/2025 12:30 PM",
        role: "Workshop Faculty",
        description: "Moderator: Dr. Yashwanth Reddy \n Panelists: \nDr. Sekhar Venkatraman, \nDr. Nameet Jerath, \nDr. Kalyan, \nDr. Prabhas Prasun Giri",
        place: " ",
        institution: " "
      },
      {
        title: "OPTIMAL PEEP - WHAT DOES CONVENTIONAL MODES OFFER\nAdvanced Ventilation",
        startTime: "6/11/2025 9:40 AM",
        endTime: "6/11/2025 10:00 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles Secunderabad"
      },
      {
        title: "HIGH FREQUENCY OSCILLATOR, CONNECTIONS OF INO TO DIFFERENT RESPIRATORY SUPPORT\nAdvanced Ventilation",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 3:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drsharma025@gmail.com": {
    facultyName: "Dr. Pradeep Sharma",
    email: "drsharma025@gmail.com",
    sessions: [
      {
        title: "Pus, Air, and Trouble: Stepwise Care in Necrotising Pneumonia",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Moderator",
        description: "Panelists:\nDr Rashmi Kapoor\nDr Kaushik Maulik\nDr Sebastian Gonzalez-Dambrauskas\nDr Sujith T\nDr Bijay Kumar Meher",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Flash Talks: PICU Dogma Disrupted",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:15 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "prashant.bachina@gmail.com": {
    facultyName: "Dr. Prashant Bachina",
    email: "prashant.bachina@gmail.com",
    sessions: [
      {
        title: "Liver Transplant: Mastering Post-Op Complications",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 8:30 AM",
        role: "Panelist",
        description: "Moderator\nDr Ravi T \n\nCo Panelists\nDr  Akashdeep\nDr  Ravi Babu K \nDr Sonal Gajbhiya\nDr Venkat Sandeep Reddy",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "dr.prashantmitharwal@gmail.com": {
    facultyName: "Dr. Prashant Mitharwal",
    email: "dr.prashantmitharwal@gmail.com",
    sessions: [
      {
        title: "Keeping the Calm: Practical Challenges in Sedating the ECMO Child",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:00 PM",
        role: "Panelist",
        description: "Moderator\nDr Parag Dakate \n\nCo- Panelists:\nDr Madhudhar Chegondi\nDr Nanda Kishore\nDr Alekhya Reddy R\nDr Deepak R",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "praveenkhilnani1957@gmail.com": {
    facultyName: "Dr. Praveen Khilnani",
    email: "praveenkhilnani1957@gmail.com",
    sessions: [
      {
        title: "Pediatric respiratory critical care research and promoting the development of a research network in India- identifying key gaps",
        startTime: "7/11/2025 10:45 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Dr. Jhuma Sankar (Moderator)\nCo Panelists\nDr Martin Kneyber\nDr. Lalita AV\nDr. Anil Sachdeva\nDr. Sunit Singhi\"\"",
        place: "Hall A",
        institution: " "
      },
      {
        title: "When Wheeze Won’t Ease: Tackling Severe Pediatric Asthma",
        startTime: "8/11/2025 9:15 AM",
        endTime: "8/11/2025 9:30 AM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Pedicriticon Keynotes",
        startTime: "8/11/2025 11:15 AM",
        endTime: "8/11/2025 12:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drpreethamp@gmail.com": {
    facultyName: "Dr. Preetam",
    email: "drpreethamp@gmail.com",
    sessions: [
      {
        title: "Buying Smart: Equipping Your PICU for Function, Not Fashion",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 3:15 PM",
        role: "Panelist",
        description: "Moderator \nDr VSV Prasad \n\nCo-Panelists:\nDr G. Ramesh \nDr Rafiq Ahmed\nDr Anand Buthada \nDr Nirmal Choraria    ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drravisharma8@gmail.com": {
    facultyName: "Dr. Ravi Sharma",
    email: "drravisharma8@gmail.com",
    sessions: [
      {
        title: "Running on ECMO",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      },
       {
        title: "Hemadsorption \nin the PICU: Magic Filter or Misplaced Faith?",
        startTime: "9/11/2025 9:45 AM",
        endTime: "9/11/2025 10:15 AM",
        role: "Debate :  For Hemadsorption is Magic Filter",
        description: "Co Debatar\nDr Vasanth - For Hemadsorption is  Misplaced Faith",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Pre test\nECMO",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:30 AM",
        role: "National coordinator",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "Cannulation Techniques\nECMO",
        startTime: "6/11/2025 10:20 AM",
        endTime: "6/11/2025 1:20 PM",
        role: "National coordinator",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "Simulation scenarios - Case based group discussion (4 cases – 20 min each)\nECMO",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 3:20 PM",
        role: "National coordinator",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "Post test\nECMO",
        startTime: "6/11/2025 3:20 PM",
        endTime: "6/11/2025 3:50 PM",
        role: "National coordinator",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "Selection, Indications & future of Pediatric ECMO\nECMO",
        startTime: "6/11/2025 2:20 PM",
        endTime: "6/11/2025 2:40 PM",
        role: "National coordinator",
        description: "Online Session",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      }
    ]
  },
  "priteshnagar@gmail.com": {
    facultyName: "Dr. Pritesh Nagar",
    email: "priteshnagar@gmail.com",
    sessions: [
      {
        title: "Simulation-Based Training: Essential for Quality or Overrated Add-On?",
        startTime: "9/11/2025 4:15 PM",
        endTime: "9/11/2025 4:45 PM",
        role: "Debater - For Overrated add on",
        description: "Co Debater\nDr. Hiroshi Kurosawa for Essential for Quality",
        place: "Hall B",
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
  "priyavarthiniv@gmail.com": {
    facultyName: "Dr. Priyavarthini",
    email: "priyavarthiniv@gmail.com",
    sessions: [
      {
        title: "Cardiac Failure & Cardiogenic Shock",
        startTime: "7/11/2025 9:00 AM",
        endTime: "7/11/2025 9:40 AM",
        role: "Moderator",
        description: "Panelists:\nDr. Ravi Kumar\nDr Ikram Ul Haque \nDr Javed Ismail \nDr.Sagar Hiremath\nDr Kalyan Kunchapudi",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Pharmacological Fine-Tuning: Vasoactive Agents in Pediatric Cardiac Care\nCardiac Critical Care",
        startTime: "6/11/2025 11:45 AM",
        endTime: "6/11/2025 12:10 PM",
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
  "poonipa@yahoo.com": {
    facultyName: "Dr. Puneet Pooni",
    email: "poonipa@yahoo.com",
    sessions: [
      {
        title: "Between Guidelines and Ground Reality: Talking to Families in Indian PICUs",
        startTime: "8/11/2025 12:30 PM",
        endTime: "8/11/2025 1:15 PM",
        role: "Moderator",
        description: "Panelists\nDr. Bakul Parikh  \nDr. Nirmal Choraria        \nDr. Hariharan Seetharaman        \nDr. Kwame Boateng\nDr Shashwat Mohanti",
        place: "Hall C",
        institution: " "
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
  "prapgi697@gmail.com": {
    facultyName: "Dr. Pushpraj Awasthi",
    email: "prapgi697@gmail.com",
    sessions: [
      {
        title: "Super-Refractory Status Epilepticus: How Far Should We Go?",
        startTime: "7/11/2025 11:45 AM",
        endTime: "7/11/2025 12:30 PM",
        role: "Panelist",
        description: "Moderator\nDr Atul Jindle \n\nCo-Pannelists:\nDr Matthew Kirschen\nDr Siva Vyasam \nDr Bharat Mehra\nDr Sridevi N",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Stack the Cheese, Stop the squeak\nUnderstanding Medication errors to prevent it\nBreakout rooms\nPCCN",
        startTime: "6/11/2025 1:45 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "Workshop",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Tuning the Tiny Tots:\nStabilization of a child in shock\nand Hemodynamic Monitoring\nPCCN",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "rachna9us@gmail.com": {
    facultyName: "Dr. Rachana Sharma",
    email: "rachna9us@gmail.com",
    sessions: [
      {
        title: "Innovators of Tomorrow: Pediatric Critical Care DM/DrNB Thesis Awards",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Co-Charperson with Dr Jolly",
        description: "Judges\nDr. Hari Krishnan        \nDr. Sainath Raman        \nDr. Hiroshi Kurosawa",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Dengue Gone Wild: Navigating the Complications",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Moderator",
        description: "Panelists:\nDr Sateesh Ghanta\nDr Daisy Khera\nDr Rujipat\nDr Sameer Sadawarte\nDr. JV Rao",
        place: "Hall C",
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
  "rajeswarins@yahoo.co.in": {
    facultyName: "Dr. Rajeshwari T",
    email: "rajeswarins@yahoo.co.in",
    sessions: [
      {
        title: "Case-Based Panel: “My Worst Myocarditis Case in the PICU",
        startTime: "9/11/2025 3:45 PM",
        endTime: "9/11/2025 4:25 PM",
        role: "Moderator",
        description: "\n\nCo Panelists\nDr Preeti Anand   \nDr Manish Kori     \nDr Ravi (KKTCH)\nDr Naresh Lal \nDr Banani Poddar",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Free Paper",
        startTime: "22/9/2025 8:00 AM",
        endTime: "22/9/2025 9:00 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "rajivuttam@hotmail.com": {
    facultyName: "Dr. Rajiv Uttam",
    email: "rajivuttam@hotmail.com",
    sessions: [
      {
        title: "Global Lungs, Local Challenges: Advancing Equitable Pediatric Respiratory Care.",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Moderator \nDr Maninder Dhaliwal \n\nCo-Panelists:\nDr Sagar lad\nDr Shekhar Venkatraman\nDr Mounika Reddy\nDr Yeshwanth Reddy",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Head Start: Timely Interventions in Traumatic Brain Injury",
        startTime: "8/11/2025 9:30 AM",
        endTime: "8/11/2025 9:45 AM",
        role: "Speaker",
        description: " ",
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
      }
    ]
  },
  "rakshayshetty@gmail.com": {
    facultyName: "Dr. Rakshay Shetty",
    email: "rakshayshetty@gmail.com",
    sessions: [
      {
        title: "Pediatric Research Networking",
        startTime: "7/11/2025 10:45 AM",
        endTime: "7/11/2025 12:30 PM",
        role: "Speaker",
        description: "Dr. Vinay Nadkarni \nDr. Nilesh Mehta \nDr. Sebastian Gonzalez-Dambrauskas \nDr. Hiroshi Kurosawa \nDr. Traci Wolbrink \nDr. Atsushi Kawaguchi \nDr. Kirsten Gibbons \nDr. Yasser Kazzaz \nDr. Lee Jan Hau \nDr. Karen Ka Yan LEUNG \nDr. Sainath Raman \nDr. Rujipat \nDr. John Adabie Appiah \nDr. Kandamaran \nDr. Ririe\nDr. Manu Sundaram",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Data Dreams or Data Drama?\nUnmasking the National PICU Database",
        startTime: "8/11/2025 1:30 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Moderator",
        description: "Co Panelists\nDr. Anjul Dayal\nDr. GV Basavaraja\nDr. Hari Krishanan        \nDr. Karthik Naryanan\nDr Mihir Sarkar",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Introduction & Foundations \n Why Simulation? Linking QI & PICU Practice\nSimulation",
        startTime: "6/11/2025 9:15 AM",
        endTime: "6/11/2025 9:45 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "All India Institute of Medical Sciences, Bibinagar"
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
  "raj2031979@gmail.com": {
    facultyName: "Dr. Ramaling Loni",
    email: "raj2031979@gmail.com",
    sessions: [
      {
        title: "Acute Flaccid Paralysis in the PICU: GBS, Myelitis, or Something Else?",
        startTime: "7/11/2025 11:15 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Dr. Rohit Vohra (Moderator)\nCo Panelists\nDr. Jesal Sheth\nDr. Mukesh Jain\nDr. Mihir Sarkar\nDr. Suchitra D",
        place: "Hall B",
        institution: " "
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
  "drrrk79@gmail.com": {
    facultyName: "Dr. Ramesh Kumar",
    email: "drrrk79@gmail.com",
    sessions: [
      {
        title: "cEEG: Essential Surveillance or Expensive Overkill?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:45 PM",
        role: "Debater - FOR OR AGAINST",
        description: "Co Debater\nDr. Hari Krishnan (Pro)",
        place: "Hall B",
        institution: " "
      },
      {
        title: "LUNG MECHANICS - ASSESSMENT, SCALARS & LOOPS, POWER\nAdvanced Ventilation",
        startTime: "6/11/2025 9:20 AM",
        endTime: "6/11/2025 9:40 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles Secunderabad"
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
        title: "HIGH FREQUENCY OSCILLATOR, CONNECTIONS OF INO TO DIFFERENT RESPIRATORY SUPPORT\nAdvanced Ventilation",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 3:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "ranganathaniyer@yahoo.com": {
    facultyName: "Dr. Ranganath Iyer",
    email: "ranganathaniyer@yahoo.com",
    sessions: [
      {
        title: "Breathless Battles: Viral Pneumonia That Won’t Back Down: What's the Trend in Pediatric Viral Pneumonia?",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr. Manish Sharma (Moderator)\nCo Panelists\nDr. Bala Ramachandaran\nDr. Hiroshi Kurosawa        \nDr. Anil Sachdeva\nDr Modi Sujeeth Kumar",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "rashmiregency@gmail.com": {
    facultyName: "Dr. Rashmi Kapoor",
    email: "rashmiregency@gmail.com",
    sessions: [
      {
        title: "Pus, Air, and Trouble: Stepwise Care in Necrotising Pneumonia",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Moderator \nDr Pradeep Sharma\n\nCo-Panelists:\nDr Kaushik Maulik\nDr Sebastian Gonzalez-Dambrauskas\nDr Sujith T\nDr Bijay KUmar Mehar",
        place: "Hall C",
        institution: " "
      },
      {
        title: "When to Refer for VATS or Decortication in Pediatric Empyema",
        startTime: "9/11/2025 4:45 PM",
        endTime: "9/11/2025 4:55 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "ravikomalla@gmail.com": {
    facultyName: "Dr. Ravi Babu K",
    email: "ravikomalla@gmail.com",
    sessions: [
      {
        title: "Liver Transplant: Mastering Post-Op Complications",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 8:30 AM",
        role: "Panelist",
        description: "Dr. Ravi T  (Moderator), \nCo Panelists\nDr. Akashdeep, \nDr. Prashant Bachina\nDr. Sonal Gajbhiya\nDr Venkat Sandeep Reddy",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Airway Ultrasound\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Local Cordinator",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "TCD – UTILITY - Autoregulation , CEREBROVASCCULAR REACTIVITY\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Local Cordinator",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "“Neck-Maps”-Anatomy,Peritubal Space & Airway Correlation with USG cases\nPOCUS (Advanced)",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:20 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Neuro Monitoring - Probe placement demonstration\n  ( TCD )\nPOCUS (Advanced)",
        startTime: "6/11/2025 9:20 AM",
        endTime: "6/11/2025 9:40 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "TCD – UTILITY - Autoregulation\nPOCUS (Advanced)",
        startTime: "6/11/2025 9:40 AM",
        endTime: "6/11/2025 10:00 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "dr.k.ravikumar@kkcth.org": {
    facultyName: "Dr. Ravi Kumar",
    email: "dr.k.ravikumar@kkcth.org",
    sessions: [
      {
        title: "Cardiac Failure & Cardiogenic Shock",
        startTime: "7/11/2025 9:00 AM",
        endTime: "7/11/2025 9:40 AM",
        role: "Panelist",
        description: "Dr. Priyavarthini (Moderator) \nCo Panelists\nDr. Javed Ismail \nDr. Ikram Ul Haque \nDr. Sagar Hiremath (NH Bnagalore) \nDr Kalyan Kunchapudi",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Case-Based Panel: “My Worst Myocarditis Case in the PICU",
        startTime: "9/11/2025 3:45 PM",
        endTime: "9/11/2025 4:25 PM",
        role: "Panelist",
        description: "Dr Rajeshwari (Moderator)\n\nCo Panelists\nDr Preeti anand        \nDr Manish Kori        \nDr Naresh Lal\nDr Banani Poddar",
        place: "Hall A",
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
        title: "Skill Station 3: Optimizing Nebulization in Respiratory Distress Children\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 2:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      }
    ]
  },
  "drravi2k5@yahoo.co.in": {
    facultyName: "Dr. Ravi T",
    email: "drravi2k5@yahoo.co.in",
    sessions: [
      {
        title: "Liver Transplant: Mastering Post-Op Complications",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 8:30 AM",
        role: "Moderator",
        description: "Panelists\nDr. Ravi Babu K\nDr. Akashdeep, \nDr. Prashant Bachina\nDr. Sonal Gajbhiya\nDr Venkat Sandeep Reddy",
        place: "Hall B",
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
