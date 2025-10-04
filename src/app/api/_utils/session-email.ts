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
        startTime: "7/11/2025 8:30 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Panelist",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "abdrauf06@gmail.com": {
    facultyName: "Dr. Abdul Rauf",
    email: "abdrauf06@gmail.com",
    sessions: [
      {
        title: "HSCT: Navigating HSCT Challenges",
        startTime: "7/11/2025 8:30 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Panelist",
        description: "Dr. Indira Jayakumar (Moderator)\n\nCo Panelists\nDr Reshma A ,\nDr Sanket R (CMC Vellore)\nDr Abhinav\nDr Krishna Chaitanya",
        place: "Hall B",
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
      },
      {
        title: "Diaphragm assessment at bed side\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "“Neck-Maps”-Anatomy,Peritubal Space & Airway Correlation with USG cases\nPOCUS (Advanced)",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:20 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "QUIZ\nPOCUS (Advanced)",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 11:00 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drabhijitbagde@gmail.com": {
    facultyName: "Dr. Abhijit Bagde",
    email: "drabhijitbagde@gmail.com",
    sessions: [
      {
        title: "Coming Off CRRT: Protocol Precision or Clinical Wisdom?",
        startTime: "9/11/2025 9:45 AM",
        endTime: "9/11/2025 10:15 AM",
        role: "Debater - Clinical Wisdom",
        description: "Other Debater\nDr Veena Ranganathan - Protocol Precision ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "abhijit.choudhary85@gmail.com": {
    facultyName: "Dr. Abhijit Chaudhary",
    email: "abhijit.choudhary85@gmail.com",
    sessions: [
      {
        title: "Transfuse or Tolerate?\nFinding the Balance in Pediatric Critical Care",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr. Lakshmi Shobhavat (Moderator)\nCo Panelists\nDr. Anand Bhutada        \nDr. Chetan Mundada        \nDr. Lalit Takia\nDr Chandra Shekar",
        place: "Hall B",
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
  "agnisekhar@hotmail.com": {
    facultyName: "Dr. Agni Sekar Saha",
    email: "agnisekhar@hotmail.com",
    sessions: [
      {
        title: "Perfuse, Protect, Preserve: The New Mantra for AKI Management",
        startTime: "9/11/2025 9:00 AM",
        endTime: "9/11/2025 9:15 AM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
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
  "dr_akashbang@rediffmail.com": {
    facultyName: "Dr. Akash Bang",
    email: "dr_akashbang@rediffmail.com",
    sessions: [
      {
        title: "Saving Lives, Saving Costs: Can We Do Both?",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr. Nirmal Choraria (Moderator)        \nCo Panelists\nDr. Somnath Gorain        \nDr. Jalani Basha        \nDr. Kshama Daphtary\nDr N L Sridhar",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "voraamish@yahoo.com": {
    facultyName: "Dr. Amish Vora",
    email: "voraamish@yahoo.com",
    sessions: [
      {
        title: "Palliative Cardiac Surgery in Resource-Limited Settings: Ethical Necessity or Compromise?",
        startTime: "8/11/2025 9:45 AM",
        endTime: "8/11/2025 10:15 AM",
        role: "Debater - on Compromise",
        description: "Co Debater\nDr Shivkumar - Ethical Necessity",
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
        title: "Cannulation Techniques\nECMO",
        startTime: "6/11/2025 10:20 AM",
        endTime: "6/11/2025 1:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "Running on ECMO",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:30 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "dr.amitvij2@gmail.com": {
    facultyName: "Dr. Amit Vij",
    email: "dr.amitvij2@gmail.com",
    sessions: [
      {
        title: "Electrolyte Emergencies in the PICU: Algorithms, Controversies, and Pitfalls",
        startTime: "9/11/2025 3:00 PM",
        endTime: "9/11/2025 3:45 PM",
        role: "Panelist",
        description: "Dr. Lalitha AV (Moderator)\nCo Panelists      \nDr. Suresh Kumar Panugati        \nDr. Nitish Upadhaya        \nDr. Atsushi Kawaguchi        \nDr Bala Krishna Reddy P",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "amitakaul@hotmail.com": {
    facultyName: "Dr. Amita Kaul",
    email: "amitakaul@hotmail.com",
    sessions: [
      {
        title: "Pediatric critical care at Legal cross routes",
        startTime: "7/11/2025 2:30 PM",
        endTime: "7/11/2025 3:10 PM",
        role: "Panelist",
        description: "Moderator: Dr Sameer Sadawarte\nPanelists:\nDr Manju Kedarnath\nDr Vinayak Pataki\nDr NL Sridhar\n",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Basic Echocardiography & views\nPOCUS \n (Basic)",
        startTime: "6/11/2025 10:15 AM",
        endTime: "6/11/2025 10:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Lotus Hospitals for women & children, Miyapur, Hyderabad"
      }
    ]
  },
  "drbhutada@gmail.com": {
    facultyName: "Dr. Anand Bhutada",
    email: "drbhutada@gmail.com",
    sessions: [
      {
        title: "Transfuse or Tolerate? Finding the Balance in Pediatric Critical Care",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Moderator \nDr Lakshmi Shobhavat\n\nCo Panelists\nDr Chetan Mundada\nDr Lalit Takia\nDr Abhijeet Chaudhary\nDr Chandra Shekar",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Buying Smart: Equipping Your PICU for Function, Not Fashion",
        startTime: "9/11/2025 2:30 PM",
        endTime: "9/11/2025 3:15 PM",
        role: "Panelist",
        description: "Moderator \nDr VSV Prasad \n\nCo Panelists\nDr G. Ramesh \nDr Rafiq Ahmed \nDr Nirmal Choraria\nDr Preetam",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Fluid and Electrolytes\nBPICC",
        startTime: "3/11/2025 11:45 AM",
        endTime: "3/11/2025 12:15 PM",
        role: "Workshop Faculty",
        description: "ONLINE LECTURES",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "Flash Talks: PICU Dogma Disrupted",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 1:15 PM",
        role: "Chairperson",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Panel Discussion\nSetting Up of Ventilator \nBPICC",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:40 AM",
        role: "Worskshop Faculty",
        description: "Moderator: \nDr. Shalu Gupta\nPanelists: \nDr Anand\nDr Jolly Chandran, \nDr Ririe \nDr Ragad Aldhwani",
        place: " ",
        institution: " "
      },
      {
        title: "POCUS\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Worskshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Neuro Cases\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Worskshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "drarunbansal@gmail.com": {
    facultyName: "Dr. Arun Bansal",
    email: "drarunbansal@gmail.com",
    sessions: [
      {
        title: "Mapping 500 PICUs Across India: Insights from the National PICU Dashboard Initiative",
        startTime: "8/11/2025 12:15 PM",
        endTime: "8/11/2025 12:30 PM",
        role: "Key note Lecture",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "NIV to Improve Oxygenation and Ventilation\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Skill Station 1: Case Based Scenario of Hypoxia\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 3:45 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      },
      {
        title: "Pedicriticon Keynotes",
        startTime: "7/11/2025 4:00 PM",
        endTime: "7/11/2025 5:00 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
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
  "anilcriticare@gmail.com": {
    facultyName: "Dr. Anil Sachdeva",
    email: "anilcriticare@gmail.com",
    sessions: [
      {
        title: "Pediatric respiratory critical care research and promoting the development of a research network in India- identifying key gaps",
        startTime: "7/11/2025 10:45 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Dr. Jhuma Sankar (Moderator) \nCo Panelists \nDr Martin Kneyber \nDr. Lalita AV \nDr. Praveen Khilnani \nDr. Sunit Singhi\n",
        place: "Hall A",
        institution: " "
      },
      {
        title: "The Art and Science of Liberation from Mechanical Ventilation",
        startTime: "8/11/2025 11:45 AM",
        endTime: "8/11/2025 12:15 PM",
        role: "Plenary",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "PediCritiCon Keynotes",
        startTime: "7/11/2025 3:30 PM",
        endTime: "7/11/2025 4:00 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "From Prolongation to Liberation: Managing Long-Term Pediatric Ventilation",
        startTime: "8/11/2025 2:45 PM",
        endTime: "8/11/2025 3:00 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "dayalanjul@gmail.com": {
    facultyName: "Dr. Anjul Dayal",
    email: "dayalanjul@gmail.com",
    sessions: [
      {
        title: "Data Dreams or Data Drama?\nUnmasking the National PICU Database",
        startTime: "8/11/2025 1:30 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Panelist",
        description: "\"Dr. Rakshay Shetty (Moderator)        \nCo Panelists \nDr. GV Basavaraja       \nDr. Hari Krishanan        \nDr. Karthik Naryanan\nDr Mihir Sarkar\"",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Data Overload: Does More Monitoring Mean Better Outcomes?",
        startTime: "9/11/2025 3:45 PM",
        endTime: "9/11/2025 4:15 PM",
        role: "Debator",
        description: "Co-debator\nDr Sibabrata Patnaik - FOR",
        place: "Hall C",
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
  "amangla101@gmail.com": {
    facultyName: "Dr. Ankit Mangla",
    email: "amangla101@gmail.com",
    sessions: [
      {
        title: "L2: Access, Membrane, Filter, circuit & solutions\nCRRT and SLED",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:00 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles, Kondapur"
      },
      {
        title: "W1: IHD & PIKRT-\nCase Based Approach\nCRRT and SLED",
        startTime: "6/11/2025 2:30 PM",
        endTime: "6/11/2025 3:10 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "puttaanu@gmail.com": {
    facultyName: "Dr. Anupama Yerra",
    email: "puttaanu@gmail.com",
    sessions: [
      {
        title: "RRT Timing: Act Fast or Wait Smart?",
        startTime: "8/11/2025 4:15 PM",
        endTime: "8/11/2025 4:45 PM",
        role: "Debater - ACT FAST",
        description: "Co Debater\nDr. Supraja C - WAIT SMART",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "ashishsimalti@rediffmail.com": {
    facultyName: "Dr. Ashish Simalti",
    email: "ashishsimalti@rediffmail.com",
    sessions: [
      {
        title: "Start Slow or Start Smart?\nShould Golden Hour DKA Management Be Aggressively Standardized ?",
        startTime: "8/11/2025 9:45 AM",
        endTime: "8/11/2025 10:15 AM",
        role: "Debater -START SMART",
        description: "Co Debater\nDr. Vijai Williams - START SLOW\n",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "dratuljindal@gmail.com": {
    facultyName: "Dr. Atul Jindle",
    email: "dratuljindal@gmail.com",
    sessions: [
      {
        title: "Super-Refractory Status Epilepticus: How Far Should We Go?",
        startTime: "7/11/2025 11:45 AM",
        endTime: "7/11/2025 12:30 PM",
        role: "Moderator",
        description: "Co Panelists\nDr. Matthew Kirschen \nDr. Siva Vyasam \nDr Bharat Mehra\nDr. Pushpraj Awasthi\nDr Sridevi N",
        place: "Hall B",
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
  "avishek_pd@rediffmail.com": {
    facultyName: "Dr. Avishek Poddar",
    email: "avishek_pd@rediffmail.com",
    sessions: [
      {
        title: "Burnout in PICU: Caring for the Caring Team",
        startTime: "9/11/2025 3:30 PM",
        endTime: "9/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr. Bala Ramachandaran(Moderator)\n\nCo Panelists\nDr. Muthuvel        \nDr. Neeraj Verma        \nDr. Asha Shenoi\nDr Sneha T",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "bakulparekh55@gmail.com": {
    facultyName: "Dr. Bakul Parikh",
    email: "bakulparekh55@gmail.com",
    sessions: [
      {
        title: "Between Guidelines and Ground Reality: Talking to Families in Indian PICUs",
        startTime: "8/11/2025 12:30 PM",
        endTime: "8/11/2025 1:15 PM",
        role: "Panelist",
        description: "Dr. Puneet Pooni(Moderator)\n\nCo Panelists  \nDr Chirag Sethi       \nDr. Hariharan Seetharaman        \nDr. Kwame Boateng\nDr Shashwat Mohanti",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "bmdoc2002@rediffmail.com": {
    facultyName: "Dr. Bal Mukund",
    email: "bmdoc2002@rediffmail.com",
    sessions: [
      {
        title: "Hemorrhage Control in Polytrauma: Precision in Pressure, Clotting & Care",
        startTime: "9/11/2025 9:00 AM",
        endTime: "9/11/2025 9:15 AM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "mdpicu@hotmail.com": {
    facultyName: "Dr. Bala Ramachandaran",
    email: "mdpicu@hotmail.com",
    sessions: [
      {
        title: "Breathless Battles: Viral Pneumonia That Won’t Back Down: What's the Trend in Pediatric Viral Pneumonia?",
        startTime: "8/11/2025 3:30 PM",
        endTime: "8/11/2025 4:15 PM",
        role: "Panelist",
        description: "Dr. Manish Sharma (Moderator)        \nCo Panelists\nDr. Anil Sachdeva        \nDr. Hiroshi Kurosawa        \nDr. Ranganath Iyer\nDr Modi Sujeeth Kumar",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Burnout in PICU: Caring for the Caring Team",
        startTime: "9/11/2025 3:30 PM",
        endTime: "9/11/2025 4:15 PM",
        role: "Moderator",
        description: "Co Panelists\nDr. Avishek Poddar        \nDr. Muthuvel        \nDr. Neeraj Verma        \nDr. Asha Shenoi\nDr Sneha T",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Benefits of early mobilisation\nPICU Liberation",
        startTime: "22/6/2025 10:25 AM",
        endTime: "22/6/2025 10:50 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
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
  "bananip@gmail.com": {
    facultyName: "Dr Banani Poddar",
    email: "bananip@gmail.com",
    sessions: [
      {
        title: "Case-Based Panel: “My Worst Myocarditis Case in the PICU",
        startTime: "9/11/2025 3:45 PM",
        endTime: "9/11/2025 4:25 PM",
        role: "Panelist",
        description: "Dr Rajeshwari (Moderator)\n\nCo Panelists\nDr Preeti anand        \nDr Manish Kori        \nDr Naresh Lal\nDr Ravi Kumar",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Interpreting Critical Labs in Suspected Metabolic Disease",
        startTime: "8/11/2025 1:00 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Moderator",
        description: "Co Panelists:\nDr Satish Deopujari \nDr Karunakar BP\nDr Dayanand Nakate\nDr Shalu Gupta\nDr Priyabrata Panda ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "PICU 360",
        startTime: "8/11/2025 12:30 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "dr.bhaktisarangi@gmail.com": {
    facultyName: "Dr. Bhakti Sarangi",
    email: "dr.bhaktisarangi@gmail.com",
    sessions: [
      {
        title: "Beyond Consent: Navigating Ethical Minefields in Pediatric Research",
        startTime: "9/11/2025 4:45 PM",
        endTime: "9/11/2025 5:30 PM",
        role: "Panelist",
        description: "Moderator\nDr Karthik Narayanan\n\nPanelists\nDr Bhakti Sarangi\nDr Michael Canarie\nDr Yasser Kazzaz\nDr Sibabrata Patnaik\nDr Harish \nKumar H",
        place: "Hall B",
        institution: " "
      }
    ]
  },
  "bkmeher187@yahoo.co.in": {
    facultyName: "Dr. Bijay Kumar Meher",
    email: "bkmeher187@yahoo.co.in",
    sessions: [
      {
        title: "Pus, Air, and Trouble: Stepwise Care in Necrotising Pneumonia",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Dr. Pradeep Sharma(Moderator)\n\nCo Panelists\nDr. Rashmi Kapoor        \nDr. Kaushik Maulik        \nDr. Sebastian Gonzalez-Dambrauskas        \nDr Sujith T",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "chetanrmundada@yahoo.co.in": {
    facultyName: "Dr. Chetan Mundada",
    email: "chetanrmundada@yahoo.co.in",
    sessions: [
      {
        title: "Transfuse or Tolerate?\nFinding the Balance in Pediatric Critical Care",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr. Lakshmi Shobhavat(Moderator)\n\nCo Panelists   \nDr. Anand Bhutada        \nDr. Lalit Takia        \nDr. Abhijeet Chaudhary\nDr Chandra Shekar",
        place: "Hall B",
        institution: " "
      },
      {
        title: "INTRODUCTION AND AIM OF THE WORKSHOP\nAdvanced Ventilation",
        startTime: "6/11/2025 8:50 AM",
        endTime: "6/11/2025 9:00 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "KIMS Cuddles Secunderabad"
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
  "lct120190@gmail.com": {
    facultyName: "Dr. Chidambaram Lakshmanan",
    email: "lct120190@gmail.com",
    sessions: [
      {
        title: "GAME ON – “Crash or Stabilise?”",
        startTime: "7/11/2025 9:40 AM",
        endTime: "7/11/2025 10:00 AM",
        role: "Quizmaster",
        description: "Fellow Quizmaster\nDr. Surjit Kumar Thappa",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "dr.chiragsethi1@gmail.com": {
    facultyName: "Dr. Chirag Sethi",
    email: "dr.chiragsethi1@gmail.com",
    sessions: [
      {
        title: "\nBetween Guidelines and Ground Reality: Talking to Families in Indian PICUs",
        startTime: "8/11/2025 12:30 PM",
        endTime: "8/11/2025 1:15 PM",
        role: "Panelist",
        description: "Moderator \nDr Puneet Pooni\n\nCo Panelists \nDr Bakul Parikh\nDr Hariharan Seetharaman\nDr Kwame Boateng\nDr Shashwat Mohanti",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "daisykhera78@gmail.com": {
    facultyName: "Dr. Daisy Khera",
    email: "daisykhera78@gmail.com",
    sessions: [
      {
        title: "Dengue Gone Wild: Navigating the Complications",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr. Rachna Sharma (Moderator)\n\nCo Panelists\nDr. Sateesh Ghanta        \nDr. Rujipat\nDr. Sameer Sadawarte\nDr. JV Rao",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Work Stations x 03 Groups\n A.Oxygen delivery devices\n B.Airway management – Intubation hands on\n C.ABG analysis\nAcute Critical Care for Practicing Paediatricians",
        startTime: "6/11/2025 11:30 AM",
        endTime: "6/11/2025 1:00 PM",
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
      },
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
  "nakated@yahoo.com": {
    facultyName: "Dr. Dayanand Nakate",
    email: "nakated@yahoo.com",
    sessions: [
      {
        title: "Interpreting Critical Labs in Suspected Metabolic Disease",
        startTime: "8/11/2025 1:00 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Panelist",
        description: "Dr. Banani Poddar (Moderator)\n\nCo Panelists   \nDr. Satish Deopujari \nDr. Karunakar BP\nDr. Shalu Gupta                        \nDr Priyabrata Panda ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Dengue Gone Wild: Navigating the Complications",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "deepankarbansal@outlook.com": {
    facultyName: "Dr. Deepankar Bansal",
    email: "deepankarbansal@outlook.com",
    sessions: [
      {
        title: "Friend, Foe, or Firefighting Tool? CRRT & Plasmapheresis in Pediatric ALF",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Panelist",
        description: "Dr Jolly Chandaran (Moderator)        \nCo Panelists \nDr Uma Ali\nDr Shalu Gupta\nDr Avinash Reddy\nDr Vasudha",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "dhireengupta@gmail.com": {
    facultyName: "Dr. Dhiren Gupta",
    email: "dhireengupta@gmail.com",
    sessions: [
      {
        title: "Echo in Action: Real-Time Clarity for Real-Life Hemodynamics.",
        startTime: "8/11/2025 10:15 AM",
        endTime: "8/11/2025 11:00 AM",
        role: "Moderator",
        description: "Panelists \nDr. Mehak Bansal \nDr. Neil C \nDr. Swathi Rao \nDr. Namita Ravikumar\nDr. Suchitra Ranjit",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Role of POCUS in VV & VA ECMO\nPOCUS (Advaced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "National Coordinator",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "USG Applications in Lung Pathology – Consolidation, Collapse, Embolism & Abscess\nPOCUS (Advaced)",
        startTime: "6/11/2025 8:40 AM",
        endTime: "6/11/2025 9:00 AM",
        role: "National Coordinator",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
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
  "eborjacob@yahoo.com": {
    facultyName: "Dr. Ebor Jacob",
    email: "eborjacob@yahoo.com",
    sessions: [
      {
        title: "PICU Education & Training",
        startTime: "7/11/2025 1:30 PM",
        endTime: "7/11/2025 2:45 PM",
        role: "Speaker",
        description: "Dr. Vinay Nadkarni \nDr. Michael Canarie \nDr. Traci Wolbrink \nDr. Atsushi Kawaguchi \nDr. Kirsten Gibbons \nDr. Karen Ka Yan LEUNG \nDr. Sainath Raman \nDr. Rujipat \nDr. John Adabie Appiah",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Bridging the Gap: Scaling Pediatric Critical Care in India’s Tier 2 Cities”. OR Reaching the Unreached: Strategies for Pediatric Critical Care in India’s Emerging Cities”",
        startTime: "9/11/2025 11:45 AM",
        endTime: "9/11/2025 12:15 PM",
        role: "Plenary",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Introduction\nBPICC",
        startTime: "3/11/2025 9:00 AM",
        endTime: "3/11/2025 9:15 AM",
        role: "National Coordinator",
        description: "ONLINE LECTURES",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "Recognition of a Sick Child\nBPICC",
        startTime: "3/11/2025 9:15 AM",
        endTime: "3/11/2025 9:45 AM",
        role: "National Coordinator",
        description: "ONLINE LECTURES",
        place: " ",
        institution: " "
      },
      {
        title: "Shock\nBPICC",
        startTime: "3/11/2025 11:15 AM",
        endTime: "3/11/2025 11:45 AM",
        role: "National Coordinator",
        description: "ONLINE LECTURES",
        place: " ",
        institution: " "
      },
      {
        title: "Shock Cases\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "“Namaste & Nurture” – Pre-briefing & Ice-Breaker\nTransport",
        startTime: "6/11/2025 8:00 AM",
        endTime: "6/11/2025 8:30 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "“Yatra Begins!”\n– Fundamentals of Pediatric Transport\nTransport",
        startTime: "6/11/2025 8:30 AM",
        endTime: "6/11/2025 9:15 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "farhanshaikh74@gmail.com": {
    facultyName: "Dr. Farhan Shaikh",
    email: "farhanshaikh74@gmail.com",
    sessions: [
      {
        title: "Monitoring of Strain and Stress without Using Oesophageal Manometry – Are We There Yet?",
        startTime: "7/11/2025 12:00 PM",
        endTime: "7/11/2025 12:15 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "PICU Brain Buzzer",
        startTime: "7/11/2025 2:45 PM",
        endTime: "7/11/2025 3:45 PM",
        role: "QuizMaster",
        description: "Co Quiz masters: \nDr Maninder Dhaliwal, \nDr Karthik Narayan\nDr Milind Jambagi",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drgsudhakar@hotmail.com": {
    facultyName: "Dr. G Sudhakar",
    email: "drgsudhakar@hotmail.com",
    sessions: []
  },
  "basavgv@gmail.com": {
    facultyName: "Dr. GV Basavaraja",
    email: "basavgv@gmail.com",
    sessions: [
      {
        title: "Data Dreams or Data Drama? Unmasking the National PICU Database",
        startTime: "8/11/2025 1:30 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Panelist",
        description: "Dr. Rakshay Shetty (Moderator)        \nCo Panelists \nDr. Anjul Dayal       \nDr. Hari Krishanan        \nDr. Karthik Naryanan\nDr Mihir Sarkar",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Tracheostomy in Pediatric Critical Care: Technique, Timing and Outcomes",
        startTime: "9/11/2025 9:30 AM",
        endTime: "9/11/2025 9:45 AM",
        role: "Speaker",
        description: " ",
        place: "Hall C",
        institution: " "
      },
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
  "indirajayakumar@yahoo.com": {
    facultyName: "Dr. Indira Jayakumar",
    email: "indirajayakumar@yahoo.com",
    sessions: [
      {
        title: "HSCT: Navigating HSCT Challenges",
        startTime: "7/11/2025 8:30 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Moderator",
        description: "Panelists\nDr Reshma A ,\nDr Abdul Rauf, \nDr Sanket R (CMC Vellore)\nDr Abhinav \nDr Krishna Chaitanya ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Initiation & Daily Management on ECMO\nECMO",
        startTime: "6/11/2025 3:00 PM",
        endTime: "6/11/2025 3:20 PM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "PICU 360",
        startTime: "8/11/2025 12:30 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Chairperson",
        description: " ",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "javedisi86@gmail.com": {
    facultyName: "Dr. Javed Ismail",
    email: "javedisi86@gmail.com",
    sessions: [
      {
        title: "Cardiac Failure & Cardiogenic Shock",
        startTime: "7/11/2025 9:00 AM",
        endTime: "7/11/2025 9:40 AM",
        role: "Panelist",
        description: "Dr. Priyavarthini (Moderator) \nCo Panelists\nDr. Ravi Kumar (KKCTH) \nDr. Ikram Ul Haque \nDr. Sagar Hiremath (NH Bnagalore) \nDr Kalyan Kunchapudi",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Flush That Line!\nWhen and How to Use Heparin Locks",
        startTime: "9/11/2025 12:35 PM",
        endTime: "9/11/2025 12:45 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "\"Sedo-analgesia -Walking on a thin line between too much and too less?\"\nPICU Liberation",
        startTime: "6/11/2025 9:25 AM",
        endTime: "6/11/2025 9:50 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "NICE Hospital, Hyderabad"
      }
    ]
  },
  "drjerincsekhar@gmail.com": {
    facultyName: "Dr. Jerin Sekhar",
    email: "drjerincsekhar@gmail.com",
    sessions: [
      {
        title: "Routine Neuroimaging in Pediatric Coma: CT vs. MRI as First-Line Modality?",
        startTime: "7/11/2025 10:45 AM",
        endTime: "7/11/2025 11:15 AM",
        role: "Debate - FOR CT",
        description: "Co Debater\nDr. Madhusudan for MRI",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Liberating from Ventilator early and Family involvement - Practicalities\nPICU Liberation",
        startTime: "6/11/2025 11:15 AM",
        endTime: "6/11/2025 11:40 AM",
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
  "drjesalsadawarte@gmail.com": {
    facultyName: "Dr. Jesal Sheth",
    email: "drjesalsadawarte@gmail.com",
    sessions: [
      {
        title: "Acute Flaccid Paralysis in the PICU: GBS, Myelitis, or Something Else?",
        startTime: "7/11/2025 11:15 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Panelist",
        description: "Dr. Rohit Vohra (Moderator), \nCo Panelists\nDr. Ramaling Loni, \nDr. Mukesh Jain, \nDr. Mihir Sarkar\nDr Suchitra D",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Antibiotics on the Clock: Timing, Dosing, and De-escalation in the ICU.",
        startTime: "9/11/2025 12:15 PM",
        endTime: "9/11/2025 12:25 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Talk on Nursing approach of a child with respiratory distress (Severity , Upper vs Lower airway, Difference between pneumonia , Asthma ,DKA)\nNursing Respiratory Care",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:00 AM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Workstation 3: nursing preparation and participation for Modified RSI in emergency\nNursing Respiratory Care",
        startTime: "6/11/2025 11:00 AM",
        endTime: "6/11/2025 1:30 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      },
      {
        title: "Simulation Scenario\nNursing Respiratory Care",
        startTime: "6/11/2025 2:00 PM",
        endTime: "6/11/2025 2:30 PM",
        role: "National Coordinator",
        description: " ",
        place: " ",
        institution: "Yashoda Hospital, Hitech City"
      }
    ]
  },
  "jhumaji@gmail.com": {
    facultyName: "Dr. Jhuma Sankar",
    email: "jhumaji@gmail.com",
    sessions: [
      {
        title: "Pediatric respiratory critical care research and promoting the development of a research network in India- identifying key gaps",
        startTime: "7/11/2025 10:45 AM",
        endTime: "7/11/2025 11:45 AM",
        role: "Moderator",
        description: "Panelists\nDr Martin Kneyber, \nDr Anil Sachdev, \nDr. Lalita AV, \nDr. Praveen Khilnani, \nDr. Sunit Singhi",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Free paper",
        startTime: "8/11/2025 8:00 AM",
        endTime: "8/11/2025 9:00 AM",
        role: "Chairperson",
        description: " ",
        place: "Hall A",
        institution: " "
      }
    ]
  },
  "jollymyla@gmail.com": {
    facultyName: "Dr. Jolly Chandran",
    email: "jollymyla@gmail.com",
    sessions: [
      {
        title: "Innovators of Tomorrow: Pediatric Critical Care DM/DrNB Thesis Awards",
        startTime: "7/11/2025 8:00 AM",
        endTime: "7/11/2025 9:00 AM",
        role: "Chairperson\n\nCo-Chairperson: Dr Rachana \n",
        description: "Judges:                             \nDr. Hari Krishnan        \nDr. Sainath Raman        \nDr. Hiroshi Kurosawa",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Friend, Foe, or Firefighting Tool? CRRT & Plasmapheresis in Pediatric ALF",
        startTime: "9/11/2025 10:15 AM",
        endTime: "9/11/2025 11:00 AM",
        role: "Moderator",
        description: "Panelists\nDr. Deepankar Bansal\nDr Uma Ali        \nDr Shalu Gupta        \nDr Avinash Reddy\nDr Vasudha",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Antimicrobial Therapy in PICU\nBPICC",
        startTime: "3/11/2025 12:45 PM",
        endTime: "3/11/2025 1:15 PM",
        role: "Workshop Faculty",
        description: "ONLINE LECTURES",
        place: " ",
        institution: "Yashoda Hospitals"
      },
      {
        title: "Panel Discussion\nSetting Up of Ventilator \nBPICC",
        startTime: "6/11/2025 9:00 AM",
        endTime: "6/11/2025 9:40 AM",
        role: "Worskshop Faculty",
        description: "Moderator: \nDr. Shalu Gupta\nPanelists: \nDr Anand\nDr Jolly Chandran, \nDr Ririe \nDr Ragad Aldhwani",
        place: " ",
        institution: " "
      },
      {
        title: "Procedural Videos\nBPICC",
        startTime: "6/11/2025 9:40 AM",
        endTime: "6/11/2025 10:10 AM",
        role: "Worskshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "POCUS\nBPICC",
        startTime: "6/11/2025 10:25 AM",
        endTime: "6/11/2025 12:45 PM",
        role: "Worskshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
      {
        title: "Cardiac Emergencies\nBPICC",
        startTime: "6/11/2025 2:15 PM",
        endTime: "6/11/2025 4:30 PM",
        role: "Worskshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      },
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
  "drrajendrantk@gmail.com": {
    facultyName: "Dr. K Rajenderan",
    email: "drrajendrantk@gmail.com",
    sessions: [
      {
        title: "Surveillance Cultures: Guardians of Prevention or Generators of Noise?",
        startTime: "9/11/2025 3:00 PM",
        endTime: "9/11/2025 3:15 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
        institution: " "
      },
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
  "ksachane@yahoo.com": {
    facultyName: "Dr. Kapil Sachane",
    email: "ksachane@yahoo.com",
    sessions: [
      {
        title: "Pediatric Mechanical Circulatory Assistance from Innovation to Impact-Tiny Hearts, Big Support.",
        startTime: "8/11/2025 9:15 AM",
        endTime: "8/11/2025 9:30 AM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Panel Discussion - Pediatric VV ECMO - Challenges and Ethical considerations\nECMO",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:20 AM",
        role: "Local Cordinator",
        description: "Moderator - \nDr Kapil B. Sachane   \n\nPanelists  - \nDr. Martin Kneyber, \nDr. Yasser, \nDr Mullai Baalaaji, \nDr Amish Vora, \nDr. Deepak",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO\nECMO Machine, Circuit & Priming",
        startTime: "6/11/2025 9:30 AM",
        endTime: "6/11/2025 10:20 AM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      },
      {
        title: "ECMO\nVentilation strategy during Pediatric and Neonatal ECMO",
        startTime: "6/11/2025 3:40 PM",
        endTime: "6/11/2025 4:00 PM",
        role: "Local Cordinator",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Hospital, Banjara Hills"
      }
    ]
  },
  "koushik.maulik@gmail.com": {
    facultyName: "Dr. Kaushik Maulik",
    email: "koushik.maulik@gmail.com",
    sessions: [
      {
        title: "Pus, Air, and Trouble: Stepwise Care in Necrotising Pneumonia",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Panelist",
        description: "Dr. Pradeep Sharma (Moderator)\n\nCo Panelists    \nDr. Rashmi Kapoor        \nDr. Sebastian Gonzalez-Dambrauskas            \nDr. Bijay Kumar Meher\nDr Sujith T",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Pulmonary Hypertension management\nCardiac Critical Care",
        startTime: "6/11/2025 11:20 AM",
        endTime: "6/11/2025 11:45 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Rainbow Children's Heart Institute"
      },
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
  "narayanankarthik86@gmail.com": {
    facultyName: "Dr. Karthik Narayanan",
    email: "narayanankarthik86@gmail.com",
    sessions: [
      {
        title: "Data Dreams or Data Drama? Unmasking the National PICU Database",
        startTime: "8/11/2025 1:30 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Panelist",
        description: "Dr. Rakshay Shetty (Moderator)        \nCo Panelists\nDr. GV Basavraja\nDr. Hari Krishanan        \nDr. Anjul Dayal\nDr Mihir Sarkar",
        place: "Hall A",
        institution: " "
      },
      {
        title: "PICU Brain Buzzer",
        startTime: "7/11/2025 2:45 PM",
        endTime: "7/11/2025 3:45 PM",
        role: "Quiz Master",
        description: "Co Quiz masters: \nDr Maninder Dhaliwal, \nDr Farhan Shaikh, \nDr Dr Milind Jambagi",
        place: "Hall C",
        institution: " "
      },
      {
        title: "Beyond Consent: Navigating Ethical Minefields in Pediatric Research",
        startTime: "9/11/2025 4:45 PM",
        endTime: "9/11/2025 5:30 PM",
        role: "Moderator",
        description: "Panelists\nDr Bhakti Sarangi\nDr Michael Canarie\nDr Yasser Kazzaz\nDr Sibabrata Patnaik\nDr Harish Kumar H",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Breath & Beyond -Advanced Respiratory POCUS – Normal lung and pleural effusion\nPOCUS (Advanced)",
        startTime: "6/11/2025",
        endTime: "6/11/2025",
        role: "Workshop Faculty",
        description: "Zoom Session",
        place: " ",
        institution: " "
      },
      {
        title: "Role of USG in Empyema –real cases and real decisions\nPOCUS (Advanced)",
        startTime: "6/11/2025 8:20 AM",
        endTime: "6/11/2025 8:40 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: " "
      }
    ]
  },
  "bpkaruns@gmail.com": {
    facultyName: "Dr. Karunakar BP",
    email: "bpkaruns@gmail.com",
    sessions: [
      {
        title: "Interpreting Critical Labs in Suspected Metabolic Diseases",
        startTime: "8/11/2025 1:00 PM",
        endTime: "8/11/2025 1:45 PM",
        role: "Panelist",
        description: "Dr. Banani Poddar (Moderator)\n\nCo Panelists      \nDr. Satish Deopujari \nDr. Dayanand Nakate\nDr. Shalu Gupta\nDr Priyabrata Panda",
        place: "Hall B",
        institution: " "
      },
      {
        title: "Stamp of Quality or Just a Stamp?\nImpact of PICU Accreditation",
        startTime: "9/11/2025 9:45 AM",
        endTime: "9/11/2025 10:15 AM",
        role: "Debater - Just a stamp",
        description: "Co-debator:\nDr. Reshma - (For Stamp of Quality)",
        place: "Hall C",
        institution: " "
      }
    ]
  },
  "drkaustabh@gmail.com": {
    facultyName: "Dr. Kaustabh Chaudhary",
    email: "drkaustabh@gmail.com",
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
        title: "Skill Station 1: Case Based Scenario of Hypoxia\nNon-Invasive Respiratory Support",
        startTime: "6/11/2025 1:30 PM",
        endTime: "6/11/2025 3:45 PM",
        role: " ",
        description: " ",
        place: " ",
        institution: "Little Stars & She Hospital, Hyderabad"
      }
    ]
  },
  "kavithatk12@gmail.com": {
    facultyName: "Dr. Kavita TK",
    email: "kavithatk12@gmail.com",
    sessions: [
      {
        title: "Innovation Over Infrastructure: Delivering Neurorehab in Our Real World.",
        startTime: "8/11/2025 4:45 PM",
        endTime: "8/11/2025 5:30 PM",
        role: "Moderator",
        description: "Panelists:\nDr. Karen Ka Yan LEUNG        \nDr. Narayanan P        \nDr. Ririe\nDr. Prabhas Prasun Giri",
        place: "Hall B",
        institution: " "
      },
      {
        title: " \t\nRetrospective chart reviews\nCLINICAL RESEARCH",
        startTime: "6/11/2025 10:30 AM",
        endTime: "6/11/2025 10:50 AM",
        role: "Workshop Faculty",
        description: " ",
        place: " ",
        institution: "Nilofer Hospital, Hyderabad"
      }
    ]
  },
  "drkhalilkhan18@gmail.com": {
    facultyName: "Dr. Khaleel Khan",
    email: "drkhalilkhan18@gmail.com",
    sessions: [
      {
        title: "From Bed to Bed: Pediatric Transport 101",
        startTime: "9/11/2025 12:55 PM",
        endTime: "9/11/2025 1:05 PM",
        role: "Speaker",
        description: " ",
        place: "Hall B",
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
      }
    ]
  },
  "chugh.krishan@gmail.com": {
    facultyName: "Dr. Krishan Chugh",
    email: "chugh.krishan@gmail.com",
    sessions: [
      {
        title: "Muscles May Fail - Protocols Shouldn't !.. Extubation Strategies in Neuromuscular Disease.",
        startTime: "8/11/2025 3:00 PM",
        endTime: "8/11/2025 3:15 PM",
        role: "Speaker",
        description: " ",
        place: "Hall A",
        institution: " "
      },
      {
        title: "Pediatric RespICU: The Superspeciality Edge",
        startTime: "7/11/2025 10:30 AM",
        endTime: "7/11/2025 12:30 PM",
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
    return Session Updated: ${facultyData.sessions[0].title};
  } else {
    return Sessions Updated: ${facultyData.sessions.length} Sessions;
  }
}

// Generate HTML email using the session updated template
function renderEmailHTML(facultyEmail: string) {
  const facultyData = FACULTY_DATA[facultyEmail as keyof typeof FACULTY_DATA];

  if (!facultyData) {
    console.error(No data found for faculty: ${facultyEmail});
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
        Failed to send email to ${facultyData.facultyName}:,
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
    Email Summary: ${successCount} successful, ${failureCount} failed out of ${results.length} total
  );

  return {
    ok: failureCount === 0,
    message: Sent ${successCount}/${results.length} emails successfully,
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
          Failed to send update email to ${facultyData.facultyName}:,
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
      message: Update emails: ${successCount}/${results.length} sent successfully,
    };
  } catch (error) {
    console.error("Failed to send update emails:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
