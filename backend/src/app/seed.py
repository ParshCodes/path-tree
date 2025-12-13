from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.term import Term
from app.models.course import Course
from app.models.program import Program


async def seed_initial_data(db: AsyncSession) -> None:
    # ----- Seed Programs -----
    existing_program = (await db.execute(select(Program))).scalars().first()
    if not existing_program:
        db.add(Program(id="COMPE", title="Computer Engineering", faculty="Engineering College", level="BS"))
        await db.commit()

    # ----- Seed Terms -----
    existing_term = (await db.execute(select(Term))).scalars().first()
    if not existing_term:
        terms = [
            Term(code="FA24", name="Fall 2024"),
            Term(code="SP25", name="Spring 2025"),
            Term(code="SU25", name="Summer 2025"),
            Term(code="FA25", name="Fall 2025"),
            Term(code="SP26", name="Spring 2026"),
        ]
        for term in terms:
            db.add(term)
        await db.commit()

    # ----- Seed Courses (COMPE) -----
    existing_course = (await db.execute(select(Course))).scalars().first()
    if not existing_course:
        courses = [
            # COMPE undergrad core / electives
            Course(
                code="COMPE 160",
                title="Introduction to Computer Programming",
                units=3,
            ),
            Course(
                code="COMPE 260",
                title="Data Structures and Object-Oriented Programming in C++",
                units=3,
            ),
            Course(
                code="COMPE 270",
                title="Digital Systems",
                units=3,
            ),
            Course(
                code="COMPE 271",
                title="Computer Organization",
                units=3,
            ),
            Course(
                code="COMPE 361",
                title="Advanced Programming",
                units=3,
            ),
            Course(
                code="COMPE 375",
                title="Embedded Systems Programming",
                units=3,
            ),
            Course(
                code="COMPE 470",
                title="Digital Circuits",
                units=3,
            ),
            Course(
                code="COMPE 470L",
                title="Digital Logic Laboratory",
                units=1,
            ),
            Course(
                code="COMPE 475",
                title="Microprocessors",
                units=3,
            ),
            Course(
                code="COMPE 491W",
                title="Senior Design Project A",
                units=3,  # pick 3 in 2–3 range
            ),
            Course(
                code="COMPE 492W",
                title="Senior Design Project B",
                units=2,  # pick 2 in 1–2 range
            ),
            Course(
                code="COMPE 496",
                title="Advanced Computer Engineering Topics",
                units=3,
            ),
            Course(
                code="COMPE 499",
                title="Special Study",
                units=3,
            ),

            # COMPE grad / 500+ / 600+ level
            Course(
                code="COMPE 510",
                title="Machine Learning for Engineers",
                units=3,
            ),
            Course(
                code="COMPE 525",
                title="Cyber-Physical Systems",
                units=3,
            ),
            Course(
                code="COMPE 560",
                title="Computer and Data Networks",
                units=3,
            ),
            Course(
                code="COMPE 561",
                title="Windows Database and Web Programming",
                units=3,
            ),
            Course(
                code="COMPE 565",
                title="Multimedia Communication Systems",
                units=3,
            ),
            Course(
                code="COMPE 570",
                title="VLSI System Design",
                units=3,
            ),
            Course(
                code="COMPE 571",
                title="Embedded Operating Systems",
                units=3,
            ),
            Course(
                code="COMPE 572",
                title="VLSI Circuit Design",
                units=3,
            ),
            Course(
                code="COMPE 596",
                title="Advanced Computer Engineering Topics",
                units=3,
            ),
            Course(
                code="COMPE 662",
                title="Wireless Sensor Networks",
                units=3,
            ),
            Course(
                code="COMPE 671",
                title="VLSI Testing",
                units=3,
            ),
            Course(code="CS101", title="Introduction to Computer Science", units=3),
            Course(code="CS201", title="Data Structures", units=4),
            Course(code="CS202", title="Algorithms", units=4),
            Course(code="CS301", title="Database Systems", units=3),
            Course(code="CS302", title="Web Development", units=3),
            Course(code="CS303", title="Software Engineering", units=4),
            Course(code="CS304", title="Operating Systems", units=4),
            Course(code="CS305", title="Computer Networks", units=3),
            Course(code="MATH101", title="Calculus I", units=4),
            Course(code="MATH102", title="Calculus II", units=4),
            Course(code="MATH201", title="Linear Algebra", units=3),
            Course(code="MATH202", title="Discrete Mathematics", units=3),
            Course(code="PHYS101", title="Physics I", units=4),
            Course(code="PHYS102", title="Physics II", units=4),
            Course(code="ENG101", title="English Composition", units=3),
            Course(code="ENG102", title="Literature", units=3),
            Course(code="CHEM101", title="Chemistry I", units=4),
            Course(code="CHEM102", title="Chemistry II", units=4),
            Course(code="BIO101", title="Biology I", units=4),
        ]
        db.add_all(courses)
        await db.commit()