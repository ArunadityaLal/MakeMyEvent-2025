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
  "nhsrcc.nurseeducator1@narayanahealth.org": {
    facultyName: "Ms. Mumtaz",
    email: "nhsrcc.nurseeducator1@narayanahealth.org",
    sessions: [
      {
        title: "NIV to Improve Oxygenation and Ventilation\nNon-Invasive Respiratory Support",
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
  "mary.julina@cmcvellore.ac.in": {
    facultyName: "Mary Julina (CMC)",
    email: "mary.julina@cmcvellore.ac.in",
    sessions: [
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
  "teja4u88@gmail.com": {
    facultyName: "Dr. Viswa Theja",
    email: "teja4u88@gmail.com",
    sessions: [
      {
        title: "Pre- Test\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 8:15 AM",
        endTime: "6/11/2025 8:30 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
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
        title: "Skill Station 3: Optimizing Nebulization in Respiratory Distress Children\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 3:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Post-Test\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 4:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      }
    ]
  },
  "brevanth99@gmail.com": {
    facultyName: "Dr. Revanth Baineni",
    email: "brevanth99@gmail.com",
    sessions: [
      {
        title: "PANEL DISCUSSION – AIRWAY OBSTRUCTION – ASTHMA, MALACIA\nAdvanced Ventilation",
        startTime: "6/11/2025 12:30 PM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: "Modaerator: Dr. Revanth Baineni\n Panelists: \nDr. Ramesh, \nDr. Sri Vidya, \nDr. Kiran, \nDr. Arpita Chattopadhyay",
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
  "kiran_kumar2510@yahoo.com": {
    facultyName: "Dr. Kiran Kumar B",
    email: "kiran_kumar2510@yahoo.com",
    sessions: [
      {
        title: "RESPIRATORY PHYSIOLOGY - IMPACT ON HEART\nAdvanced Ventilation",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:20 AM",
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
        title: "BRONCHOSCOPY IN PICU – BRONCHO-ALVEOLAR LAVAGE\nAdvanced Ventilation",
        startTime: "6/11/2025 12:30 PM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drvishnuvardhanreddy@rainbowhospitals.in": {
    facultyName: "Dr. Vishnu",
    email: "drvishnuvardhanreddy@rainbowhospitals.in",
    sessions: [
      {
        title: "ARE THE FRIENDS IN SYNC?? DEALING WITH ASYNCHRONY\nAdvanced Ventilation",
        startTime: "6/11/2025 2:20 PM",
        endTime: "6/11/2025 2:40 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles Secunderabad"
      },
      {
        title: "BRONCHOSCOPY IN PICU – BRONCHO-ALVEOLAR LAVAGE\nAdvanced Ventilation",
        startTime: "6/11/2025 4:20 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
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
        title: "Simulation scenarios - Case based group discussion (4 cases – 20 min each)\nECMO",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 3:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      }
    ]
  },
  "drsatarc@gmail.com": {
    facultyName: "Dr. Satyabrata Roy Chaudhry",
    email: "drsatarc@gmail.com",
    sessions: [
      {
        title: "Setting up a bronchoscopy\nBronchoscopy",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:30 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      },
      {
        title: "Paediatric basic airway\nBronchoscopy",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      }
    ]
  },
  "sindupavithra92@gmail.com": {
    facultyName: "Ms. Sindhu Pavitra (Mehta)",
    email: "sindupavithra92@gmail.com",
    sessions: [
      {
        title: "Paediatric difficult airway\nBronchoscopy",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      }
    ]
  },
  "dr.nag007gmc@gmail.com": {
    facultyName: "Dr. Nagarjuna",
    email: "dr.nag007gmc@gmail.com",
    sessions: [
      {
        title: "Interventional bronchoscopy\nBronchoscopy",
        startTime: "6/11/2025 12:45 PM",
        endTime: "6/11/2025 1:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      }
    ]
  },
  "mounishb63@gmail.com": {
    facultyName: "Dr. Mounnish Balaji",
    email: "mounishb63@gmail.com",
    sessions: [
      {
        title: "BAL\nBronchoscopy",
        startTime: "6/11/2025 12:15 PM",
        endTime: "6/11/2025 12:45 PM",
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
  "santosh.medico@gmail.com": {
    facultyName: "Dr. Santosh",
    email: "santosh.medico@gmail.com",
    sessions: [
      {
        title: "Pediatric Environmental Hazards\n A.Burns\n B.Envenomation\n C.Poisoning – Decontamination\n D.Transport of sick child\nAcute Critical Care For Practicing Pediatrician",
        startTime: "6/11/2025 3:15 PM",
        endTime: "6/11/2025 4:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      }
    ]
  },
  "nandhinianand5@gmail.com": {
    facultyName: "Ms. Nandhini (NH)",
    email: "nandhinianand5@gmail.com",
    sessions: [
      {
        title: "Troubleshooting & Emergency Scenarios - Power failure, Air in Circuit , Flow disturbances, Circuit change, Component change , etc\nECMO",
        startTime: "6/11/2025 10:20 AM",
        endTime: "6/11/2025 1:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "Simulation scenarios - Case based group discussion (4 cases – 20 min each)\nECMO",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 3:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      }
    ]
  },
  "phani.bhargavi24@gmail.com": {
    facultyName: "Dr. Bharghavi ( Ped Cardio)",
    email: "phani.bhargavi24@gmail.com",
    sessions: [
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
        title: "Simulation scenarios - Case based group discussion (4 cases – 20 min each)\nECMO",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 3:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "Role of POCUS in Pediatric and Neonatal ECMO\nECMO",
        startTime: "6/11/2025 5:00 PM",
        endTime: "6/11/2025 5:20 PM",
        role: " ",
        description: "Online Session",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      }
    ]
  },
  "ganapathysubramaniamk@gmail.com": {
    facultyName: "Dr. Ganapathy",
    email: "ganapathysubramaniamk@gmail.com",
    sessions: [
      {
        title: "Cannulation Techniques\nECMO",
        startTime: "6/11/2025 10:20 AM",
        endTime: "6/11/2025 1:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "Cannulation Strategies & Type - VV , VA and Hybrid\nECMO",
        startTime: "6/11/2025 2:40 PM",
        endTime: "6/11/2025 3:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      }
    ]
  },
  "dutta_monideepa@yahoo.co.in": {
    facultyName: "Dr. Moindeep Dutta",
    email: "dutta_monideepa@yahoo.co.in",
    sessions: [
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
  "nageswararaokoneti7@gmail.com": {
    facultyName: "Dr. Nageswar Rao",
    email: "nageswararaokoneti7@gmail.com",
    sessions: [
      {
        title: "Mastering ICU Care for Pediatric Heart Failure\nPediatric Cardiac Critical Care ",
        startTime: "6/11/2025 9:15 AM",
        endTime: "6/11/2025 9:40 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      }
    ]
  },
  "hrehaan2015@gmail.com": {
    facultyName: "Dr. Shwetha Nathani",
    email: "hrehaan2015@gmail.com",
    sessions: [
      {
        title: "Station 3: Real Cases, Real Solutions: Navigating Pediatric Cardiac Crises\nCardiac Critical Care",
        startTime: "6/11/2025 1:15 PM",
        endTime: "6/11/2025 4:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      }
    ]
  },
  "satyakrishnadr@gmail.com": {
    facultyName: "Dr. Sathyanarayana",
    email: "satyakrishnadr@gmail.com",
    sessions: [
      {
        title: "Station 2: Life Support Mastery: ECMO, and iNO in Pediatric Cardiac Care\nCardiac Critical Care",
        startTime: "6/11/2025 1:15 PM",
        endTime: "6/11/2025 4:15 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
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
  "bsunkoj@hotmail.com": {
    facultyName: "Dr. Sunkoj Bhaskar",
    email: "bsunkoj@hotmail.com",
    sessions: [
      {
        title: "Nursing WS 2",
        startTime: "6/11/2025",
        endTime: " ",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "The Pediatric Cardiac ICU",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 10:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "Sreedeepks@gmail.com": {
    facultyName: "Dr Sreedeep KS",
    email: "Sreedeepks@gmail.com",
    sessions: [
      {
        title: "Failure to prepare is preperation to fail\nTriage and Emergency Preparedness\nPCCN",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Breathe Easy:\nCare plan of a child with respiratory\ndistress:\nOxygen delivery devices HFNC, NIV (P)\nPCCN",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Spotting the Signs\nSimulation scenario on\nrecognition of a sick child\n(Hemodynamics & Respiratory)\nPCCN",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 3:46 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "vjamalpuri@gmail.com": {
    facultyName: "Dr. Vijayanand",
    email: "vjamalpuri@gmail.com",
    sessions: [
      {
        title: "Integrating Simulation into the QI Cycle\nSimulation",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "mail2tarun060794@gmail.com": {
    facultyName: "Dr Tarun",
    email: "mail2tarun060794@gmail.com",
    sessions: [
      {
        title: "BRONCHOSCOPY IN PICU – BRONCHO-ALVEOLAR LAVAGE\nAdvanced Ventilation",
        startTime: "6/11/2025 4:20 PM",
        endTime: "6/11/2025 5:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles Secunderabad"
      }
    ]
  },
  "drpavan4u@gmail.com": {
    facultyName: "Dr Pavan",
    email: "drpavan4u@gmail.com",
    sessions: [
      {
        title: "Free Paper",
        startTime: "8/11/2025 8:00 AM",
        endTime: "8/11/2025 8:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "santhosh.dare2face@gmail.com": {
    facultyName: "Dr Santhosh kumar Routhu",
    email: "santhosh.dare2face@gmail.com",
    sessions: [
      {
        title: "L4: ABC of CKRT prescription\nCRRT and SLED",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 11:00 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Apollo Medical College"
      }
    ]
  },
  "bhukyarajshekar@gmail.com": {
    facultyName: "Dr Rajasekhar Bhukya",
    email: "bhukyarajshekar@gmail.com",
    sessions: [
      {
        title: "“Ambulance Darshan” –Inside the Beast: Ambulance Anatomy & Action Zone\nTransport",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:15 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "“Bol Bachchan SBAR” – Handover without Hangover\nTransport",
        startTime: "6/11/2025 11:15 AM",
        endTime: "6/11/2025 11:45 AM",
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
      },
      {
        title: "Special Ops!\n(Air, ECMO & Infectious Cases)\nTransport",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 3:45 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "shilpa.t22@gmail.com": {
    facultyName: "Dr Shilpa",
    email: "shilpa.t22@gmail.com",
    sessions: [
      {
        title: "Pediatric Environmental Hazards\n A.Burns\n B.Envenomation\n C.Poisoning – Decontamination\n D.Transport of sick child\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 3:15 PM",
        endTime: "6/11/2025 4:00 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Gachibowli"
      }
    ]
  },
  "kiransmiles4u@gmail.com": {
    facultyName: "Dr Kiran Karthik",
    email: "kiransmiles4u@gmail.com",
    sessions: [
      {
        title: "Breathe Easy:\nCare plan of a child with respiratory\ndistress:\nOxygen delivery devices HFNC, NIV (P)\nPCCN",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Paramitha Hospital"
      }
    ]
  },
  "snehalgdesai@gmail.com": {
    facultyName: "Dr Snehal Desai",
    email: "snehalgdesai@gmail.com",
    sessions: []
  },
  "sudeepkumar51088@gmail.com": {
    facultyName: "Dr. Sudeep Kumar K",
    email: "sudeepkumar51088@gmail.com",
    sessions: [
      {
        title: "PICU liberation protocol – \nDoes one size fit all\nPICU Liberation",
        startTime: "6/11/2025 11:40 AM",
        endTime: "6/11/2025 12:00 PM",
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
  "drdeepakr84@gmail.com": {
    facultyName: "Dr. Deepak R",
    email: "drdeepakr84@gmail.com",
    sessions: [
      {
        title: "Keeping the Calm: Practical Challenges in Sedating the ECMO Child",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:00 PM",
        role: "Panelist",
        description: "Moderator\nDr Parag Dakate \n\nPanelists\nDr Prashanth Mitharwal\nDr Madhudhar Chegondi\nDr Nanda Kishore\nDr Alekhya Reddy R",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Panel Discussion - Pediatric VV ECMO - Challenges and Ethical considerations\nECMO",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:20 AM",
        role: "Panelist",
        description: "Moderator - \nDr Kapil B. Sachane   \n\nPanelists  - \nDr. Martin Kneyber, \nDr. Yasser, \nDr Mullai Baalaaji, \nDr Amish Vora, \nDr. Deepak",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO Machine, Circuit & Priming\nECMO",
        startTime: "6/11/2025 10:20 AM",
        endTime: "6/11/2025 1:20 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      }
    ]
  },
  "bharatmehra909@gmail.com": {
    facultyName: "Dr Bharat Mehra",
    email: "bharatmehra909@gmail.com",
    sessions: [
      {
        title: "Super-Refractory Status Epilepticus: How Far Should We Go?",
        startTime: "7/11/2025 11:45 AM",
        endTime: "7/11/2025 12:30 PM",
        role: "Panelist",
        description: "Moderator\nDr Atul Jindle \n\nCo Panelists\nDr. Matthew Kirschen \nDr. Siva Vyasam \nDr. Pushpraj Awasthi\nDr Sridevi N",
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
  "sujittummala@yahoo.com": {
    facultyName: "Dr. Sujith Tummala",
    email: "sujittummala@yahoo.com",
    sessions: [
      {
        title: "Paediatric basic airway\nBronchoscopy",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 5:00 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: "Ankura Hospitals, Kukatpally"
      }
    ]
  },
  "sravya1990@gmail.com": {
    facultyName: "Sravya",
    email: "sravya1990@gmail.com",
    sessions: [
      {
        title: "Pre- Test\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 8:15 AM",
        endTime: "6/11/2025 8:30 AM",
        role: " ",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Abdominal Ultrasound & e – FAST.Nebulization Therapy with HFNC and NIV in Respiratory Distress Children\nIncluding Product Presentation -Aerogen Ltd.\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 12:45 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Skill Station 3: Optimizing Nebulization in Respiratory Distress Children\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 3:45 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Post-Test\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 4:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      }
    ]
  },
  "dr.srilu84@gmail.com": {
    facultyName: "Dr Srikanth M",
    email: "dr.srilu84@gmail.com",
    sessions: [
      {
        title: "The Pediatric Cardiac ICU",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 10:00 AM",
        role: "Chairperson",
        description: " ",
        place: "HALL A",
        institution: " "
      }
    ]
  },
  "drnarahari44@gmail.com": {
    facultyName: "Dr Narahari",
    email: "drnarahari44@gmail.com",
    sessions: [
      {
        title: "Critical Kidneys: PICU Perspectives",
        startTime: "7/11/2025 1:30 PM",
        endTime: "7/11/2025 3:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "rsvsrikirshna@gmail.com": {
    facultyName: "Dr Srikrishna RSV",
    email: "rsvsrikirshna@gmail.com",
    sessions: [
      {
        title: "Oncology and Transplant ICU: Challenges \n& Solutions",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 10:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "tilak_adusumalli@yahoo.co.in": {
    facultyName: "Dr Tilak Chandra Pal",
    email: "tilak_adusumalli@yahoo.co.in",
    sessions: [
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
  "apoorvahospital@gmail.com": {
    facultyName: "Dr E Arjun",
    email: "apoorvahospital@gmail.com",
    sessions: [
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
  "vamshikondle@gmail.com": {
    facultyName: "Dr Vamshi Kondle",
    email: "vamshikondle@gmail.com",
    sessions: [
      {
        title: "PICU Case Cafe",
        startTime: "7/11/2025 10:10 AM",
        endTime: "7/11/2025 10:45 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "cnirmala06@yahoo.com": {
    facultyName: "Dr. Nirmala Circuri",
    email: "cnirmala06@yahoo.com",
    sessions: [
      {
        title: "Cardiac Critical Care: Rhythms of Survival",
        startTime: "8/11/2025 9:00 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "sheshuswathi10@gmail.com": {
    facultyName: "Dr. Sheshu Madhav",
    email: "sheshuswathi10@gmail.com",
    sessions: [
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
  "abhaskarmd@gmail.com": {
    facultyName: "Dr. Arkala Bhaskar",
    email: "abhaskarmd@gmail.com",
    sessions: [
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
  "drajaymohan@yahoo.com": {
    facultyName: "Dr. Ajay Mohan",
    email: "drajaymohan@yahoo.com",
    sessions: [
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
  "drksrisailam@yahoo.com": {
    facultyName: "Dr Srisailam",
    email: "drksrisailam@yahoo.com",
    sessions: [
      {
        title: "The New Gold Standard in Ventilation?\nIn Mechanical Power We Trust… or Not?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:45 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "drsatishmd99@gmail.com": {
    facultyName: "Dr. Satish Vadapalli",
    email: "drsatishmd99@gmail.com",
    sessions: [
      {
        title: "Free Paper",
        startTime: "8/11/2025 8:00 AM",
        endTime: "8/11/2025 8:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "drklreddy1966@gmail.com": {
    facultyName: "Dr Linga Reddy",
    email: "drklreddy1966@gmail.com",
    sessions: [
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
  "thandaprasad@gmail.com": {
    facultyName: "Dr Thanda Prasad",
    email: "thandaprasad@gmail.com",
    sessions: [
      {
        title: "PICU 360°",
        startTime: "8/11/2025 12:30 AM",
        endTime: "8/11/2025 1:45 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "yerrojukodandapani@yahoo.co.in": {
    facultyName: "Dr Kodanda Pani",
    email: "yerrojukodandapani@yahoo.co.in",
    sessions: [
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
  "drvkedar@gmail.com": {
    facultyName: "Dr Vamsidhar Kedar",
    email: "drvkedar@gmail.com",
    sessions: [
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
  "siriloki@gmail.com": {
    facultyName: "Dr. Lokesh Lingappa",
    email: "siriloki@gmail.com",
    sessions: [
      {
        title: "cEEG: Essential Surveillance or Expensive Overkill?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:45 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "somumed@gmail.com": {
    facultyName: "Dr C Suman Kumar",
    email: "somumed@gmail.com",
    sessions: [
      {
        title: "Urgency & Algorithms: The Golden Hour Toolkit",
        startTime: "8/11/2025 9:00 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "dr.ayeshabegumnh5@gmail.com": {
    facultyName: "Dr Ayesha Begum",
    email: "dr.ayeshabegumnh5@gmail.com",
    sessions: [
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
  "ravideepy@gmail.com": {
    facultyName: "Dr. Ravideep",
    email: "ravideepy@gmail.com",
    sessions: [
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
