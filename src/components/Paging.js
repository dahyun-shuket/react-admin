import React from "react";
import "./Paging.css";
// import Pagination from "react-js-pagination";
const Paging = ({ postsPerPage, totalPosts, paginate }) => {
    // const [page, setPage] = useState(1);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default Paging;
