import React from "react";
import moment from "moment";

function ResumeapplyLists(resumeLists) {
    console.log("resumeListsresumeListsresumeLists"+JSON.stringify(resumeLists))
    return (

        <>
            {resumeLists.resumeLists.map((data) => {
                return (
                    <tr key={data.SEQ}>
                        <td>{data.COMPANY}</td>
                        <td>{moment(data.WOKSTART).format('YYYY-MM-DD')} ~ {(data.WORKEND) ? moment(data.WORKEND).format('YYYY-MM-DD') : '재직 중' }</td>
                        <td>{data.POSITION}</td>
                        <td>{data.JOBTYPE}</td>
                        <td>{data.WORKREGION}</td>
                        <td>{data.CHARGE}</td>
                        <td>{data.SALARY}</td>
                    </tr>
                );
            })}
        </>
    );
}

export default ResumeapplyLists;
