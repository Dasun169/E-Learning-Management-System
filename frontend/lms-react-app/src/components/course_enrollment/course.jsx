import "./course.css";

function Course() {
  return (
    <div className="course-enrollment">
      <h1>PMAT 23456 - Mathematical Method</h1>

      <section className="body">

        <div className="left"> 
          <h2>Enrolment options</h2>
          <div className="lecture">
            <h3>
              <span>Lecturer's Name: </span>
              Dasun Navindu
            </h3>
          </div>
          <div className="course-pic"></div>
          <div className="link">
            <a href="#">PMAT 23456 - Mathematical Method</a>
          </div>
        </div>

        <div className="right">
          <div className="title">
            <h3>Self Enrolment (Student)</h3>
          </div>
          <div className="enrollment-option"> 
            <h4>Enrolment key</h4>
            <input type="text"/>
            <button>
              Enrol Me
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Course;
