const Course = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => (
                <div key={course.id}>
                    <p>{course.name}</p>
                    {course.parts.map((part) => (
                        <p key={part.id}>{part.name} {part.exercises}</p>
                    ))}
                    <b>
                        Total of Exercises:{" "}
                        {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
                    </b>
                </div>
            ))}
        </div>
    )
}

export default Course