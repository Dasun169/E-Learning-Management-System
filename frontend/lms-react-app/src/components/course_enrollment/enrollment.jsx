import "./css files/enrollment.css";

function Enrollment() {
  return (
    <div className="course-enrollment5">
      <h1>PMAT 23456 - Mathematical Method</h1>

      <section className="body5">
        <div className="left5">
          <h2><u>Enrolment options</u></h2>
          <div className="lecture5">
            <h3>Lecturer's Name: Dasun Navindu</h3>
          </div>
          <div className="link5">
            <a href="#">PMAT 23456 - Mathematical Method</a>
          </div>
        </div>

        <div className="right5">
          <div className="title5">
            <h3>Self Enrolment (Student)</h3>
          </div>
          <div className="enrollment-option5">
            <h4>Enrolment key</h4>
            <input type="text" />
            <button>Enrol Me</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Enrollment;
