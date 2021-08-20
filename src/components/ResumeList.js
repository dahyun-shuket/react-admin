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
                        <td>
                            <Link to={`/admin/resume/${data.SEQ}`}>{data.NAME}</Link>
                        </td>
                        <td>{data.CONTACT}</td>
                        <td>{data.BIRTHYEAR}</td>
                        <td>{data.GENDER}</td>
                        <td>{data.WORKREGION_NAME}</td>
                        <td>{data.JOBKIND_NAME}</td>
                        <td>{data.CERTIFICATE}</td>
                        <td>{moment(data.MODIFIED).format('YYYY-MM-DD')}</td>
                        <td>
                            <Button className="btn-icon btn-neutral" color="success" id="tooltip824696339" size="sm" type="button">
                                <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip824696339" />
                        </td>
                    </tr>
                );
            })}
        </>
    );
}

export default ResumeList;
