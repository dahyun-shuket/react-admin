import React, { useEffect, useState } from "react";
import axios from "axios";
import RecruitLists from "components/RecruitList";

import Paging from "components/Paging";
import { Route } from "react-router";

const Recruit = ({match, location, history}) => {
    const [recruitLists, setRecruitLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const recruitList = async () => {
        setLoading(true);
        axios.post("http://localhost:3000/api/recruit/list")
            .then((response) => {
            setRecruitLists(response.data.data.list);
            setLoading(false);
        });
    };

    useEffect(() => {
        recruitList();
    }, []);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recruitLists.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="content">
                <RecruitLists recruitLists={currentPosts} loading={loading}></RecruitLists>
                <Paging postsPerPage={postsPerPage}
                        totalPosts={recruitLists.length}
                        paginate={paginate}>
                </Paging>
            </div>
        </>
    );
};

export default Recruit;
