"""
Add Computer Engineering courses to the database.
"""
import asyncio
from sqlalchemy import select
from app.core.database import SessionLocal
from app.models.course import Course


COMPE_COURSES = [
    ("COMPE 160", "Introduction to Computer Programming", 3),
    ("COMPE 260", "Data Structures and Object-Oriented Programming in C++", 3),
    ("COMPE 270", "Digital Systems", 3),
    ("COMPE 271", "Computer Organization", 3),
    ("COMPE 361", "Advanced Programming", 3),
    ("COMPE 375", "Embedded Systems Programming", 3),
    ("COMPE 470", "Digital Circuits", 3),
    ("COMPE 470L", "Digital Logic Laboratory", 1),
    ("COMPE 475", "Microprocessors", 3),
    ("COMPE 491W", "Senior Design Project A", 3),
    ("COMPE 492", "Senior Design Project B", 3),
    ("COMPE 496", "Algorithm Design and Programming", 3),
    ("COMPE 499", "Special Study", 3),
    ("COMPE 510", "Machine Learning for Engineers", 3),
    ("COMPE 560", "Computer and Data Networks", 3),
    ("COMPE 561", "Windows Database and Web Programming", 3),
    ("COMPE 565", "Multimedia Communication Systems", 3),
    ("COMPE 570", "VLSI System Design", 3),
    ("COMPE 571", "Embedded Operating Systems", 3),
    ("COMPE 572", "VLSI Circuit Design", 3),
    ("COMPE 596", "Accelerated Computing", 3),
    ("COMPE 662", "Wireless Sensor Networks", 3),
    ("COMPE 665", "Multimedia Wireless Networks", 3),
    ("COMPE 671", "VLSI Testing", 3),
    ("COMPE 696", "Artificial Intelligence for Unmanned Systems", 3),
]


async def add_courses():
    async with SessionLocal() as db:
        added = 0
        skipped = 0
        
        for code, title, units in COMPE_COURSES:
            # Check if course already exists
            result = await db.execute(select(Course).where(Course.code == code))
            existing = result.scalar_one_or_none()
            
            if existing:
                print(f"⏭️  Skipped {code} - already exists")
                skipped += 1
            else:
                course = Course(code=code, title=title, units=units)
                db.add(course)
                print(f"✅ Added {code}: {title} ({units}u)")
                added += 1
        
        await db.commit()
        print(f"\n📊 Summary: {added} added, {skipped} skipped, {added + skipped} total")


if __name__ == "__main__":
    asyncio.run(add_courses())
