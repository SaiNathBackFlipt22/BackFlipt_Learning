

import React, { useEffect, useState } from "react";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

function ErrorPage() {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowError(true);
        }, 3000); // Display error message after 5 seconds

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            {!showError && <div>
                <Loader active inline='centered' />
            </div>}
            {showError && (
                <div id="main">
             <div className='container'>
               <h2>Page Not Found....</h2>
               <h2>Refresh and try again .....</h2>
                 <h1>Error 404</h1>
             </div>
         </div>
            )}
        </div>
    );
}

export default ErrorPage;
