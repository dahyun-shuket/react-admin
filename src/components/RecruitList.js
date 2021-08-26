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
                        <td className="text-center">{data.NAME}</td>
                        <td className="text-center">
                            <Link to={`/admin/recruit/${data.SEQ}`}>{data.SUBJECT}</Link>
                        </td>
                        <td className="text-center">{data.JOBKIND_NAME}</td>
                        <td className="text-center">{data.JOBRANK}</td>
                        <td className="text-center">{data.WORKINGTYPE_NAME}</td>
                        <td className="text-center">{data.WORKREGION_NAME}</td>
                        <td className="text-center">{moment(data.STARTDATE).format('YYYY-MM-DD')} ~ 
                        {(data.ENDDATE) ? moment(data.ENDDATE).format('YYYY-MM-DD') : '구인시'}</td>
                        <td className="text-center">{data.APPLYCOUNT}</td>
                        <td className="text-center">{(data.ACTIVE == 'Y') ? '구인 중' : '마감'}</td>
                        <td className="text-center">{moment(data.MODIFIED).format('YYYY-MM-DD')}</td>
                    </tr>
                );
            })}
        </>
    );
}

export default RecruitLists;
