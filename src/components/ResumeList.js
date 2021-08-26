import React from "react";
import { Link } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";
import moment from "moment";
// import axios from "axios";

function ResumeList(resumeLists) {

    return (
        <>
            {resumeLists.resumeLists.map((data) => {
                return (
                    <tr key={data.SEQ}>
                        <td className="text-center">
                            <Link to={`/admin/resume/${data.SEQ}`}>{data.NAME}</Link>
                        </td>
                        <td className="text-center">{data.CONTACT}</td>
                        <td className="text-center">{data.BIRTHYEAR}</td>
                        <td className="text-center">{data.GENDER}</td>
                        <td className="text-center">{data.WORKREGION_NAME}</td>
                        <td className="text-center">{data.JOBKIND_NAME}</td>
                        <td className="text-center">{data.CERTIFICATE}</td>
                        <td className="text-center">{moment(data.MODIFIED).format('YYYY-MM-DD')}</td>
                    </tr>
                );
            })}
        </>
    );
}

export default ResumeList;
