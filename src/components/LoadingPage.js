import React from "react";

export default function LoadingPage(props){
    return(
        <div className="loading-page bg-dark d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="mb-2">CodeChallenge</h1>
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}