import React from 'react';
import RetroButton from "../components/retrobutton.tsx";
function AboutPage() {

    

  return (
    <React.Fragment>

      <main className="mt-16 p-4 space-y-8">
        <h1 className="text-4xl font-bold">Welcome to TestPage</h1>
          <div>
              <RetroButton children={"RetroButtonTest"}>

              </RetroButton>
          </div>
      </main>
    </React.Fragment>
  );
}

export default AboutPage;
