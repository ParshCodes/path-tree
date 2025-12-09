"""
Seed script to populate the database with Electrical Engineering B.S. program courses
from SDSU's curriculum.
"""
import asyncio
from app.core.database import SessionLocal
from app.models.course import Course

# Electrical Engineering B.S. - SDSU Courses
EE_COURSES = [
    # Lower Division Core
    {"code": "EE 101", "title": "Electrical Engineering Orientation", "units": 1},
    {"code": "EE 210", "title": "Digital Design", "units": 3},
    {"code": "EE 230", "title": "Electric Circuits I", "units": 3},
    {"code": "EE 240", "title": "Introduction to Signals and Systems", "units": 3},
    
    # Upper Division Core
    {"code": "EE 300", "title": "Linear Systems", "units": 3},
    {"code": "EE 310", "title": "Embedded System Design", "units": 4},
    {"code": "EE 330", "title": "Electric Circuits II", "units": 3},
    {"code": "EE 340", "title": "Electromagnetic Field Theory", "units": 3},
    {"code": "EE 350", "title": "Electronics I", "units": 4},
    {"code": "EE 380", "title": "Probability and Statistics for EE", "units": 3},
    {"code": "EE 420", "title": "Communication Systems", "units": 3},
    {"code": "EE 450", "title": "Electronics II", "units": 4},
    {"code": "EE 460", "title": "Control Systems", "units": 3},
    {"code": "EE 488", "title": "Senior Design Project I", "units": 2},
    {"code": "EE 489", "title": "Senior Design Project II", "units": 2},
    
    # Mathematics
    {"code": "MATH 150", "title": "Calculus I", "units": 4},
    {"code": "MATH 151", "title": "Calculus II", "units": 4},
    {"code": "MATH 252", "title": "Calculus III", "units": 4},
    {"code": "MATH 254", "title": "Introduction to Linear Algebra", "units": 3},
    {"code": "MATH 245", "title": "Discrete Mathematics", "units": 3},
    {"code": "MATH 350", "title": "Differential Equations", "units": 3},
    
    # Physics
    {"code": "PHYS 195", "title": "Mechanics", "units": 4},
    {"code": "PHYS 196", "title": "Electricity and Magnetism", "units": 4},
    {"code": "PHYS 197", "title": "Waves, Optics, and Modern Physics", "units": 4},
    
    # Computer Science
    {"code": "CS 107", "title": "Introduction to Computer Science", "units": 3},
    {"code": "CS 108", "title": "Introduction to Computer Science Laboratory", "units": 1},
    {"code": "CS 210", "title": "Data Structures", "units": 3},
    {"code": "CS 211", "title": "Object-Oriented Programming", "units": 3},
    
    # Chemistry
    {"code": "CHEM 200", "title": "General Chemistry I", "units": 3},
    {"code": "CHEM 201", "title": "General Chemistry Laboratory I", "units": 1},
    
    # Engineering
    {"code": "ENGR 101", "title": "Introduction to Engineering", "units": 2},
    
    # Technical Electives (common choices)
    {"code": "EE 400", "title": "Power Systems", "units": 3},
    {"code": "EE 410", "title": "Signals and Systems", "units": 3},
    {"code": "EE 420", "title": "Feedback Control Systems", "units": 3},
    {"code": "EE 420L", "title": "Control Systems Laboratory", "units": 1},
    {"code": "EE 430", "title": "Analysis and Design of Electronic Circuits", "units": 3},
    {"code": "EE 430L", "title": "Electronic Circuits Laboratory", "units": 2},
    {"code": "EE 439", "title": "Instrumentation Circuits", "units": 3},
    {"code": "EE 440", "title": "Electromagnetic Waves", "units": 3},
    {"code": "EE 450", "title": "Digital Signal Processing", "units": 3},
    {"code": "EE 458", "title": "Analog and Pulse Communication Systems", "units": 3},
    {"code": "EE 458L", "title": "Communications and Digital Signal Processing Laboratory", "units": 1},
    {"code": "EE 465", "title": "Digital Signal Processing", "units": 3},
    {"code": "EE 470", "title": "Computer Networks", "units": 3},
    {"code": "EE 475", "title": "Machine Learning", "units": 3},
    {"code": "EE 480", "title": "Power System Analysis", "units": 3},
    {"code": "EE 483", "title": "Power Distribution Systems", "units": 3},
    {"code": "EE 485", "title": "Optical Engineering", "units": 3},
    {"code": "EE 490", "title": "Renewable Energy Systems", "units": 3},
    {"code": "EE 491W", "title": "Senior Design A", "units": 1},
    {"code": "EE 492", "title": "Senior Design B", "units": 3},
    {"code": "EE 495", "title": "Internship", "units": 1},
    {"code": "EE 499", "title": "Special Study", "units": 1},
    {"code": "EE 503", "title": "Biomedical Instrumentation", "units": 3},
    {"code": "EE 522", "title": "Digital Control Systems", "units": 3},
    {"code": "EE 530", "title": "Analog Integrated Circuit Design", "units": 3},
    {"code": "EE 540", "title": "Microwave Devices and Systems", "units": 3},
    {"code": "EE 581", "title": "Power System Dynamics", "units": 3},
    {"code": "EE 584", "title": "Power Electronics", "units": 3},
    {"code": "EE 584L", "title": "Power Electronics Laboratory", "units": 1},
    
    # General Education - Foundations of Learning
    # Written Communication (Area A1)
    {"code": "ENGL 101", "title": "Composition", "units": 3},
    {"code": "ENGL 105", "title": "Composition and Critical Thinking", "units": 3},
    {"code": "RWS 100", "title": "Freshman Composition", "units": 3},
    
    # Oral Communication (Area A2)
    {"code": "COMM 103", "title": "Oral Communication", "units": 3},
    {"code": "COMM 160", "title": "Introduction to Public Speaking", "units": 3},
    
    # Critical Thinking (Area A3)
    {"code": "PHIL 101", "title": "Introduction to Philosophy", "units": 3},
    {"code": "PHIL 102", "title": "Introduction to Logic", "units": 3},
    {"code": "ENGL 280", "title": "Writing for Engineers", "units": 3},
    
    # Mathematics/Quantitative Reasoning (Area B4)
    {"code": "MATH 101", "title": "Intermediate Algebra", "units": 3},
    {"code": "MATH 141", "title": "Precalculus", "units": 4},
    {"code": "STAT 119", "title": "Elementary Statistics", "units": 3},
    
    # Physical Sciences (Area B1)
    {"code": "ASTR 101", "title": "The Solar System", "units": 3},
    {"code": "ASTR 102", "title": "Stars and Galaxies", "units": 3},
    {"code": "GEOL 101", "title": "Dynamic Earth", "units": 3},
    {"code": "GEOL 104", "title": "Geology and the Environment", "units": 3},
    {"code": "PHYS 180A", "title": "Physics for Life Sciences I", "units": 3},
    
    # Life Sciences (Area B2)
    {"code": "BIOL 100", "title": "Biology as a Natural Science", "units": 3},
    {"code": "BIOL 101", "title": "Principles of Biology I", "units": 3},
    {"code": "ENVS 101", "title": "Environmental Science", "units": 3},
    
    # Laboratory Science (Area B3)
    {"code": "BIOL 100L", "title": "Biology as a Natural Science Lab", "units": 1},
    {"code": "CHEM 100L", "title": "Chemistry in Everyday Life Lab", "units": 1},
    {"code": "PHYS 180AL", "title": "Physics for Life Sciences Lab I", "units": 1},
    
    # Arts (Area C1)
    {"code": "ART 101", "title": "Art Appreciation", "units": 3},
    {"code": "ART 157", "title": "Introduction to Visual Culture", "units": 3},
    {"code": "MUS 101", "title": "Music Appreciation", "units": 3},
    {"code": "MUS 109", "title": "History of Rock and Roll", "units": 3},
    {"code": "THEA 101", "title": "Introduction to Theatre", "units": 3},
    {"code": "DANC 120", "title": "Dance Appreciation", "units": 3},
    
    # Humanities (Area C2)
    {"code": "HIST 100", "title": "World History to 1500", "units": 3},
    {"code": "HIST 101", "title": "World History Since 1500", "units": 3},
    {"code": "HUM 101", "title": "Introduction to Humanities", "units": 3},
    {"code": "LING 100", "title": "Introduction to Language and Linguistics", "units": 3},
    {"code": "RELS 100", "title": "Religions of the World", "units": 3},
    {"code": "CLAS 170", "title": "Classical Mythology", "units": 3},
    
    # Social Sciences (Area D)
    {"code": "ANTH 102", "title": "Introduction to Cultural Anthropology", "units": 3},
    {"code": "ECON 101", "title": "Principles of Microeconomics", "units": 3},
    {"code": "ECON 102", "title": "Principles of Macroeconomics", "units": 3},
    {"code": "GEOG 101", "title": "World Regional Geography", "units": 3},
    {"code": "HIST 108", "title": "History of the United States I", "units": 3},
    {"code": "HIST 109", "title": "History of the United States II", "units": 3},
    {"code": "POLS 101", "title": "Introduction to Political Science", "units": 3},
    {"code": "POLS 103", "title": "American Politics", "units": 3},
    {"code": "PSYCH 101", "title": "General Psychology", "units": 3},
    {"code": "SOC 101", "title": "Principles of Sociology", "units": 3},
    {"code": "WS 101", "title": "Introduction to Women's Studies", "units": 3},
    
    # Ethnic Studies (Area F)
    {"code": "AIS 101", "title": "Introduction to American Indian Studies", "units": 3},
    {"code": "AFRA 100", "title": "Introduction to Africana Studies", "units": 3},
    {"code": "CHS 100", "title": "Introduction to Chicana and Chicano Studies", "units": 3},
    {"code": "ETHS 101", "title": "Introduction to Ethnic Studies", "units": 3},
    
    # Upper Division GE - Explorations of Human Experience
    {"code": "COMM 302", "title": "Communication and Culture", "units": 3},
    {"code": "ENGL 330", "title": "Literature and Film", "units": 3},
    {"code": "HIST 300", "title": "Historical Thinking", "units": 3},
    {"code": "PHIL 320", "title": "Ethics", "units": 3},
    {"code": "PSYCH 320", "title": "Social Psychology", "units": 3},
    {"code": "SOC 350", "title": "Social Problems", "units": 3},
    
    # Additional Communication and Critical Thinking
    {"code": "AFRAS 120", "title": "Composition", "units": 3},
    {"code": "AFRAS 140", "title": "Oral Communication", "units": 3},
    {"code": "AFRAS 200", "title": "Intermediate Expository Writing and Research Fundamentals", "units": 3},
    {"code": "AMIND 120", "title": "Written Communication", "units": 3},
    {"code": "AMIND 225", "title": "Expository Writing and Research", "units": 3},
    {"code": "CCS 111A", "title": "Oral Communication", "units": 3},
    {"code": "CCS 111B", "title": "Written Communication", "units": 3},
    {"code": "CCS 200", "title": "Intermediate Expository Research and Writing", "units": 3},
    {"code": "ECL 100", "title": "Rhetoric of Written Argument", "units": 3},
    {"code": "ECL 200", "title": "Rhetoric of Written Arguments in Context", "units": 3},
    {"code": "LING 100B", "title": "English Composition for International Students and English Learners II", "units": 3},
    {"code": "LING 200", "title": "Advanced English for International Students", "units": 3},
    {"code": "POL S 100", "title": "Rhetoric of Written Argument", "units": 3},
    {"code": "RWS 105B", "title": "Rhetoric of Written Argument Stretch II", "units": 3},
    {"code": "RWS 200", "title": "Rhetoric of Written Arguments in Context", "units": 3},
    {"code": "RWS 220", "title": "Rhetoric of Written Arguments and the Tutoring of Writing", "units": 3},
    {"code": "PHIL 200", "title": "Critical Thinking and Composition", "units": 3},
    
    # Additional Physical Sciences
    {"code": "ASTR 201", "title": "Astronomy for Science Majors", "units": 3},
    {"code": "CHEM 100", "title": "Introduction to General Chemistry with Laboratory", "units": 4},
    {"code": "CHEM 102", "title": "Introduction to General, Organic, and Biological Chemistry", "units": 5},
    {"code": "ENGR 250", "title": "Introduction to Renewable Energy", "units": 3},
    {"code": "ENV S 100", "title": "Environmental Sciences", "units": 3},
    {"code": "GEOG 101", "title": "Earth's Physical Environment", "units": 3},
    {"code": "GEOG 103", "title": "Weather and Climate", "units": 3},
    {"code": "GEOL 100", "title": "Planet Earth", "units": 3},
    {"code": "N SCI 100", "title": "Physical Science", "units": 3},
    {"code": "OCEAN 100", "title": "The Ocean Planet", "units": 4},
    {"code": "SUSTN 100", "title": "Environmental Sciences", "units": 3},
    
    # Additional Life Sciences
    {"code": "ANTH 101", "title": "Human Biocultural Origins", "units": 3},
    {"code": "BIOL 101L", "title": "World of Animals Laboratory", "units": 1},
    {"code": "CHEM 162", "title": "Saving Our Planet with Sustainable Biochemistry", "units": 3},
    
    # Additional Laboratory Sciences
    {"code": "ASTR 109", "title": "Astronomy Laboratory", "units": 1},
    {"code": "GEOG 101L", "title": "Earth's Physical Environment Laboratory", "units": 1},
    {"code": "GEOL 101", "title": "Dynamics of the Earth Laboratory", "units": 1},
    
    # Additional Mathematics/Quantitative Reasoning
    {"code": "ARP 201", "title": "Introductory Statistics and Research Design for Education", "units": 3},
    {"code": "BIOL 215", "title": "Biostatistics", "units": 3},
    {"code": "CS 100", "title": "Computer Science Principles", "units": 3},
    {"code": "ECON 201", "title": "Statistical Methods", "units": 3},
    {"code": "GEN S 147", "title": "Data Literacy: Human Choices Behind the Numbers", "units": 3},
    {"code": "GEOG 104", "title": "Geographic Information Science and Spatial Reasoning", "units": 3},
    {"code": "LING 270", "title": "Elementary Statistics for Language Studies", "units": 3},
    {"code": "MATH 110", "title": "Mathematics for Life", "units": 3},
    {"code": "MATH 118", "title": "Topics in Mathematics", "units": 3},
    {"code": "MATH 120", "title": "Calculus for Business Analysis", "units": 3},
    {"code": "MATH 124", "title": "Calculus for the Life Sciences", "units": 4},
    {"code": "MATH 140", "title": "College Algebra", "units": 3},
    {"code": "MATH 210", "title": "Number Systems in Elementary Mathematics", "units": 3},
    {"code": "MATH 211", "title": "Geometry in Elementary Mathematics", "units": 3},
    {"code": "PHIL 120", "title": "Introduction to Logic", "units": 3},
    {"code": "POL S 201", "title": "Statistics and Politics", "units": 3},
    {"code": "PSY 280", "title": "Statistical Methods in Psychology", "units": 4},
    {"code": "P H 250", "title": "Infections and Epidemics", "units": 3},
    {"code": "SOC 201", "title": "Elementary Social Statistics", "units": 3},
    {"code": "STAT 250", "title": "Statistical Principles and Practices", "units": 3},
    
    # Additional Social and Behavioral Sciences
    {"code": "AFRAS 101", "title": "Introduction to Africana Studies: Social and Behavioral Sciences", "units": 3},
    {"code": "ANTH 103", "title": "Introduction to Archaeology and World Prehistory", "units": 3},
    {"code": "ASIAN 100", "title": "State and Society in the Asia Pacific", "units": 3},
    {"code": "ASIAN 104", "title": "Korean American Experiences", "units": 3},
    {"code": "CCS 220", "title": "Language in the Borderlands", "units": 3},
    {"code": "FIN 250", "title": "Financial Literacy", "units": 3},
    {"code": "GEN S 280", "title": "Introduction to Civic Engagement", "units": 3},
    {"code": "GEN S 290", "title": "Introduction to Undergraduate Research", "units": 3},
    {"code": "GEOG 102", "title": "People, Places, and Environments", "units": 3},
    {"code": "GEOG 106", "title": "World Regional Geography", "units": 3},
    {"code": "GEOG 170", "title": "Sustainable Places and Practices", "units": 3},
    {"code": "GERO 101", "title": "Introduction to Human Aging", "units": 3},
    {"code": "HIST 110", "title": "American History Since the Civil War", "units": 3},
    {"code": "JMS 200", "title": "Introduction to Contemporary Media", "units": 3},
    {"code": "JMS 250", "title": "Introduction to Intersectional Representation in the Media", "units": 3},
    {"code": "LATAM 101", "title": "Introduction to Latin American Studies", "units": 3},
    {"code": "LEAD 205", "title": "Exploring Leadership", "units": 3},
    {"code": "LING 101", "title": "Introduction to Language", "units": 3},
    {"code": "LING 251", "title": "Dialects of English", "units": 3},
    {"code": "MGT 160", "title": "Entrepreneurial Approaches to Problem Identification", "units": 3},
    {"code": "POL S 101", "title": "Introduction to American Politics in Global Perspective", "units": 3},
    {"code": "POL S 102", "title": "Introduction to American and California Government and Politics", "units": 3},
    {"code": "POL S 104", "title": "Introduction to Global Politics", "units": 3},
    {"code": "PSY 101", "title": "Introductory Psychology", "units": 3},
    {"code": "SCI 250", "title": "Informal Learning and Instruction of Mathematics and Science", "units": 3},
    {"code": "SOC 102", "title": "Introduction to Social Problems", "units": 3},
    {"code": "SLHS 106", "title": "Introduction to Speech, Language, and Hearing Sciences", "units": 3},
    {"code": "SLHS 150", "title": "Sign Languages and Deaf Culture", "units": 3},
    {"code": "SLHS 222", "title": "Communication as a Human Right", "units": 3},
    {"code": "TE 250", "title": "Informal Learning and Instruction of Mathematics and Science", "units": 3},
    {"code": "WMNST 103", "title": "Women and Global Justice", "units": 3},
    
    # Additional Arts Courses
    {"code": "ART 133", "title": "Modern Making", "units": 3},
    {"code": "ART 215", "title": "Visual Odyssey through Comics and Sequential Media", "units": 3},
    {"code": "ART 258", "title": "Introduction to Art History I", "units": 3},
    {"code": "ART 259", "title": "Introduction to Art History II", "units": 3},
    {"code": "ASIAN 264", "title": "Asian American Film and Media", "units": 3},
    {"code": "BRAZ 233", "title": "Latin American Documentary Practices", "units": 3},
    {"code": "DANCE 101", "title": "Dance Influencers", "units": 3},
    {"code": "DANCE 181", "title": "Introduction to Dance", "units": 3},
    {"code": "ECL 157", "title": "Comics and History", "units": 3},
    {"code": "ECL 158", "title": "Introduction to Horror Aesthetics", "units": 3},
    {"code": "ECL 220", "title": "The Art of Literature", "units": 3},
    {"code": "HIST 135", "title": "Film as the Past", "units": 3},
    {"code": "HIST 157", "title": "Comics and History", "units": 3},
    {"code": "MUSIC 151", "title": "Introduction to Music", "units": 3},
    {"code": "TFM 160", "title": "Cinema as Art", "units": 3},
    {"code": "TFM 235", "title": "The Art of Creating Emotion in Movies", "units": 3},
    {"code": "TFM 265", "title": "Cinema in Africa", "units": 3},
    {"code": "TFM 267", "title": "Independent Cinema", "units": 3},
    {"code": "THEA 100", "title": "The Art of Theatre", "units": 3},
    {"code": "THEA 120", "title": "Heritage of Storytelling", "units": 3},
    {"code": "THEA 205", "title": "American Musical on Stage and Screen", "units": 3},
    
    # Humanities - Languages and Literature
    {"code": "AFRAS 240", "title": "Africana Intellectual Thought", "units": 3},
    {"code": "AFRAS 260", "title": "Africana Literary Study", "units": 3},
    {"code": "AMIND 210", "title": "Indigenous Women and the Arts", "units": 3},
    {"code": "ASIAN 101", "title": "Asian Thought and Cultures", "units": 3},
    {"code": "ASIAN 110", "title": "Elementary Conversational Chinese", "units": 3},
    {"code": "CLASS 120", "title": "English Words from Latin and Greek", "units": 3},
    {"code": "CLASS 140", "title": "Introduction to Classics", "units": 3},
    {"code": "ECL 270", "title": "Introduction to Comparative Literature", "units": 3},
    {"code": "ECL 280", "title": "Introduction to Creative Writing", "units": 3},
    {"code": "EUROP 101", "title": "Introduction to European Studies", "units": 3},
    {"code": "EUROP 160", "title": "European Reflections on Science and Technology", "units": 3},
    {"code": "HUM 102", "title": "Global Humanities", "units": 3},
    {"code": "HUM 103", "title": "Introduction to Public Humanities", "units": 3},
    {"code": "HUM 130", "title": "The Jewish Heritage", "units": 3},
    {"code": "HUM 140", "title": "World Mythology", "units": 3},
    {"code": "JS 130", "title": "The Jewish Heritage", "units": 3},
    {"code": "LING 243", "title": "Invented Languages - Klingon and Beyond!", "units": 3},
    {"code": "PORT 110", "title": "Beginner Portuguese for Spanish Speakers", "units": 3},
    {"code": "RWS 250", "title": "Rhetoric in Everyday Life", "units": 3},
    {"code": "WMNST 102", "title": "Women: Images and Ideas", "units": 3},
    
    # Lifelong Learning and Self-Development (Area E)
    {"code": "ANTH 111", "title": "Anthropology of the Night: Sleep, Dreams, and Demons", "units": 3},
    {"code": "ANTH 112", "title": "Conspiracy and Culture", "units": 3},
    {"code": "ANTH 113", "title": "Pseudoscience and Science in Archaeology", "units": 3},
    {"code": "ASIAN 111", "title": "The Mindful Brain", "units": 3},
    {"code": "AFRAS 102", "title": "An Afrocentric Response to Generational Trauma", "units": 3},
    {"code": "CCS 275", "title": "Sports and Race", "units": 3},
    {"code": "CCS 280", "title": "Youth Studies in Racialized Contexts", "units": 3},
    {"code": "CFD 135", "title": "Principles of Family Development", "units": 3},
    {"code": "CFD 170", "title": "Child and Adolescent Development from a Cultural Perspective", "units": 3},
    {"code": "CFD 270", "title": "Human Development Across the Lifespan", "units": 3},
    {"code": "CSP 150", "title": "Adversity, Resilience, and the Science of Well-Being", "units": 3},
    {"code": "CSP 240", "title": "Career Development and Life Design", "units": 3},
    {"code": "COMM 245", "title": "Interpersonal Communication", "units": 3},
    {"code": "DANCE 281", "title": "Dance, Popular Culture, and Identity", "units": 3},
    {"code": "ECL 245", "title": "Literature, the Self, and Society", "units": 3},
    {"code": "ENGR 100", "title": "Perspectives in Human-Technology Frontier", "units": 3},
    {"code": "GEN S 150", "title": "Building Your Future Self for Success in College and Beyond", "units": 3},
    {"code": "GEN S 260", "title": "Introduction to Peace and Social Justice", "units": 3},
    {"code": "HIST 114", "title": "Sports in American History", "units": 3},
    {"code": "HIST 125", "title": "Sexuality, Past and Present", "units": 3},
    {"code": "HIST 150", "title": "Why History Matters", "units": 3},
    {"code": "HUM 201", "title": "The Body: Identity, Crisis, Resistance", "units": 3},
    {"code": "JMS 210", "title": "Social Media in the Digital Age", "units": 3},
    {"code": "LGBT 101", "title": "Introduction to LGBTQ+ Studies", "units": 3},
    {"code": "LING 252", "title": "Language Across the Lifespan", "units": 3},
    {"code": "NURS 253", "title": "Stress and Human Health", "units": 3},
    {"code": "PHIL 140", "title": "Technology and Human Behavior", "units": 3},
    {"code": "PSY 117", "title": "Health, Happiness, and Academic/Professional Success", "units": 3},
    {"code": "RTM 100", "title": "Sustainable Self-Development", "units": 3},
    {"code": "RTM 102", "title": "Wellness and Recreation for Life Through Surfing", "units": 3},
    {"code": "RTM 200", "title": "Recreation, Travel, and Self-Awareness", "units": 3},
    {"code": "REL S 258", "title": "Death, Dying, and Afterlife", "units": 3},
    {"code": "SOC 115", "title": "Body and Society", "units": 3},
    {"code": "TE 170", "title": "Child and Adolescent Development from a Cultural Perspective", "units": 3},
    {"code": "WMNST 101", "title": "Gender: Self, Identity, and Society", "units": 3},
    
    # Ethnic Studies (Area F) - Additional Courses
    {"code": "AFRAS 170A", "title": "Afro-American History", "units": 3},
    {"code": "AFRAS 170B", "title": "Afro-American History", "units": 3},
    {"code": "AFRAS 331", "title": "The Black Family", "units": 3},
    {"code": "AFRAS 332", "title": "Black Women: Myth and Reality", "units": 3},
    {"code": "AFRAS 351", "title": "Black Religions and Spirituality", "units": 3},
    {"code": "AFRAS 422", "title": "Modern Civil Rights Movement", "units": 3},
    {"code": "AFRAS 423", "title": "Black Nationalism", "units": 3},
    {"code": "AFRAS 476", "title": "History and Culture of Hip Hop", "units": 3},
    {"code": "AMIND 110", "title": "American Indian Heritage", "units": 3},
    {"code": "AMIND 140", "title": "U.S. History from an American Indian Perspective to 1870", "units": 3},
    {"code": "AMIND 141", "title": "U.S. History from an American Indian Perspective Since 1870", "units": 3},
    {"code": "AMIND 370", "title": "Tribal Gaming: Cultural and Political Context", "units": 3},
    {"code": "AMIND 435", "title": "Indians through Film and Television", "units": 3},
    {"code": "ASIAN 102A", "title": "Politics, Power, and Asian America", "units": 3},
    {"code": "ASIAN 102B", "title": "Asian American History", "units": 3},
    {"code": "ASIAN 103", "title": "Introduction to Filipino/Philippine Studies", "units": 3},
    {"code": "ASIAN 422", "title": "Asian American Experiences", "units": 3},
    {"code": "ASIAN 460", "title": "Contemporary Issues in Filipino-American Communities", "units": 3},
    {"code": "CCS 100", "title": "Chicana and Chicano Heritage", "units": 3},
    {"code": "CCS 110", "title": "Introduction to Chicana and Chicano Studies", "units": 3},
    {"code": "CCS 120A", "title": "Chicana and Chicano Role in the American Political System", "units": 3},
    {"code": "CCS 120B", "title": "Chicana and Chicano Role in the American Political System", "units": 3},
    {"code": "CCS 141A", "title": "History of the United States", "units": 3},
    {"code": "CCS 141B", "title": "History of the United States", "units": 3},
    {"code": "CCS 141C", "title": "History of U.S. Interventions in Central America, 1821-present", "units": 3},
    {"code": "CCS 150", "title": "Critical Issues in Chicana Studies", "units": 3},
    {"code": "CCS 306", "title": "Mexican Immigration", "units": 3},
    {"code": "CCS 340A", "title": "Gender, Sex, and Politics in Colonial Mexico", "units": 3},
    {"code": "CCS 340B", "title": "Chicana Women's History: 1848-Present", "units": 3},
    
    # Additional History Courses
    {"code": "HIST 102", "title": "World History Through Science and Technology", "units": 3},
    {"code": "HIST 105", "title": "Western Civilization to the Seventeenth Century", "units": 3},
    {"code": "HIST 106", "title": "Western Civilization Since the Sixteenth Century", "units": 3},
    
    # Religious Studies
    {"code": "REL S 100", "title": "Exploring the Bible", "units": 3},
    {"code": "REL S 102", "title": "Exploring the Qur'an", "units": 3},
    {"code": "REL S 103", "title": "American Religious Diversity", "units": 3},
]


async def seed_courses():
    """Add all EE program courses to the database."""
    async with SessionLocal() as session:
        try:
            print("Starting course seed...")
            
            for course_data in EE_COURSES:
                # Check if course already exists
                existing = await session.get(Course, course_data["code"])
                if existing:
                    print(f"  Course {course_data['code']} already exists, skipping...")
                    continue
                
                # Create new course
                course = Course(
                    code=course_data["code"],
                    title=course_data["title"],
                    units=course_data["units"],
                )
                session.add(course)
                print(f"  Added: {course_data['code']} - {course_data['title']}")
            
            await session.commit()
            print(f"\n✅ Successfully seeded {len(EE_COURSES)} courses!")
            
        except Exception as e:
            print(f"\n❌ Error seeding courses: {e}")
            await session.rollback()
            raise


if __name__ == "__main__":
    asyncio.run(seed_courses())
