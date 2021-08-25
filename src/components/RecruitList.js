import React from "react";
import { Link } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";
import moment from "moment";
function RecruitLists({ recruitLists, loading, props }) {
    if (loading) 
        return <h2>Loading...</h2>;
    
    return (
        <>
            {recruitLists.map((data) => {
                return (
                    <tr key={data.SEQ}>
                        <td>{data.NAME}</td>
                        <td>
                            <Link to={`/admin/recruit/${data.SEQ}`}>{data.SUBJECT}</Link>
                        </td>
                        <td>{data.JOBKIND_NAME}</td>
                        <td>{data.JOBRANK}</td>
                        <td>{data.WORKINGTYPE_NAME}</td>
                        <td>{data.WORKREGION_NAME}</td>
                        <td>{moment(data.STARTDATE).format('YYYY-MM-DD')} ~ 
                        {(data.ENDDATE) ? moment(data.ENDDATE).format('YYYY-MM-DD') : '구인시'}</td>
                        <td>{data.APPLYCOUNT}</td>
                        <td>{(data.ACTIVE == 'Y') ? '구인 중' : '마감'}</td>
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

export default RecruitLists;
