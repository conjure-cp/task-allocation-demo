import React, { useEffect, useState } from 'react';

const REPO_URL = 'conjure-cp/task-allocation-demo'

const Banner = () => {
  // fetch and slice the contributors list
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
      // Fetch contributors from GitHub
      fetch(`https://api.github.com/repos/${REPO_URL}/contributors`)
        .then(response => response.json())
        .then(data => {
          const filteredData = data.filter(contributor => contributor.login !== 'williamburns' && !contributor.login.endsWith('[bot]'));
          setContributors(filteredData.map(contributor => contributor.login));
        })
        .catch(error => console.error('Error:', error));
    }, []);

    const chunkSize = 3;
    const chunkedContributors = [];
  
    // Chunk the array into sizes of 3
    for (let i = 0; i < contributors.length; i += chunkSize) {
      chunkedContributors.push(contributors.slice(i, i + chunkSize));
    }

    return (
      <div className="h-full text-white p-4">
        {/* 
          1. Banner Container
            Height      : 'h-full' makes the div take up the full height of its parent.
            Background  : 'bg-gray-900' sets the background colour to dark gray.
            Text Colour : 'text-white' sets the text colour to white.
            Padding     : 'p-4' sets padding of 4 units on all sides.
        */}
        
          {/* 
            2. Flex Container
              Container   : 'container' sets the max-width to the designed container width.
              Margin Auto : 'mx-auto' centers the container horizontally.
              Flex Row    : 'flex flex-row' enables flex layout and arranges children in a row.
              Justify     : 'justify-between' places the first item at the start and the last item at the end.
              Responsive  : md:grid-cols-4 TODO
          */}
        <div className=" container m-auto grid grid-cols-5 grid-flow-col-dense gap-2"> 

          {/* 
            2.4 Logo
                Flex-Col   : 'flex flex-col' enables flex layout and arranges children in a column.
                Alignment  : 'items-start' aligns the flex items to the start of the container.
                2.2.1 span
                    Text Style: 'text-lg font-semibold mb-2' sets the text size to large, makes it 
                                semi-bold and adds a margin-bottom of 2 units.
            */}
          <div className="col-span-2 row-span-5 flex flex-col items-start p-4">
              {/* Logo */}
              <div className="flex items-center p-2">
                <img src="conjure-cp-logo.png" alt="conjure-cp" className="w-16 h-16" />
                  <div className="text-xl font-semibold ml-4">
                    <a href="https://github.com/conjure-cp" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      conjure-cp
                    </a>
                  </div>
              </div>
              <div className="mb-2">Workload Planner</div>
              <div className="mb-2">Version: 1.0</div>
              <div className="mb-2">This project is created as a dissertation project at the University of St Andrews for optimal workload planning.</div>
              <div className="mb-2">License: Mozilla Public License 2.0</div>
              {/* Last Updated */}
              <div className="text-sm mb-2">Last Updated: 20-10-2023</div>
            </div>


           <div className="row-start-1 col-span-5 border-t border-slate-700"/>

          {/* 
            2.1 Contributor Info Section 
                Flex-Col   : 'flex flex-col' enables flex layout and arranges children in a column.
                Alignment  : 'items-start' aligns the flex items to the start of the container.
                2.1.1 span
                    Text Style: 'text-lg font-semibold mb-2' sets the text size to large, makes it 
                                semi-bold and adds a margin-bottom of 2 units.
            */}
          <div className="row-start-2 col-span-1 flex flex-col items-stretch">
            <span className="text-lg font-semibold mb-2">Project Author</span>
            <div className="grid grid-cols-2 grid-flow-col gap-2 overflow-auto"> 
              <a href={`https://github.com/williamburns`} className="mb-1 hover:underline" >William Burns</a>
            </div>
          </div>

          {/* 
            2.1 Contributor Info Section 
                Flex-Col   : 'flex flex-col' enables flex layout and arranges children in a column.
                Alignment  : 'items-start' aligns the flex items to the start of the container.
                2.1.1 span
                    Text Style: 'text-lg font-semibold mb-2' sets the text size to large, makes it 
                                semi-bold and adds a margin-bottom of 2 units.
            */}
          <div className="row-start-2 col-span-2 flex flex-col items-stretch">
            <span className="text-lg font-semibold mb-2">Project Contributors</span>
            <div className="grid grid-cols-2 grid-flow-col gap-2 overflow-auto"> 
            {chunkedContributors.map((chunk, chunkIndex) => (
              <div key={`chunk-${chunkIndex}`} className="row-span-1 col-span-1 flex flex-col items-start">
                {chunk.map((contributor, index) => (
                  <a key={index} href={`https://github.com/${contributor}`} className="mb-1 hover:underline">{contributor}</a>
                ))}
              </div>
            ))}
            </div>
          </div>
          {/* Horizontal line */}
          <div className="row-start-3 col-span-3 border-t border-slate-700"/>
          
          {/* 
            2.2 Source Code Info Section 
                Flex-Col   : 'flex flex-col' enables flex layout and arranges children in a column.
                Alignment  : 'items-start' aligns the flex items to the start of the container.
                2.2.1 span
                    Text Style: 'text-lg font-semibold mb-2' sets the text size to large, makes it 
                                semi-bold and adds a margin-bottom of 2 units.
            */}
           <div className="row-start-4 col-span-1 flex flex-col items-stretch">
            <span className="text-lg font-semibold mb-2">Additional Links</span>
            <a href={`https://github.com/${REPO_URL}`} className="mb-1 hover:underline">GitHub</a>
            <a href={`https://github.com/${REPO_URL}#readme`} className="mb-1 hover:underline">Documentation</a>
            <a href={`https://github.com/${REPO_URL}#application-preview`} className="mb-1 hover:underline">Demo</a>
          </div>

            
          {/* 
            2.2 Source Code Info Section 
                Flex-Col   : 'flex flex-col' enables flex layout and arranges children in a column.
                Alignment  : 'items-start' aligns the flex items to the start of the container.
                2.2.1 span
                    Text Style: 'text-lg font-semibold mb-2' sets the text size to large, makes it 
                                semi-bold and adds a margin-bottom of 2 units.
            */}
           <div className="row-start-4 col-span-1 flex flex-col items-stretch">
              <span className="text-lg font-semibold mb-2">Demo</span>
              <a href={`https://github.com/${REPO_URL}/blob/main/screenshots/create-project.gif`} className="mb-1 hover:underline">Create new project</a>
              <a href={`https://github.com/${REPO_URL}/blob/main/screenshots/create-category.gif`} className="mb-1 hover:underline">Create new category</a>
              <a href={`https://github.com/${REPO_URL}/blob/main/screenshots/create-task.gif`} className="mb-1 hover:underline">Create new task</a>
              <a href={`https://github.com/${REPO_URL}/blob/main/screenshots/create-user.gif`} className="mb-1 hover:underline">Create new user</a>
          </div>

          {/* Horizontal line */}
          <div className="row-start-5 col-span-5 border-t border-slate-700"/>
       
        </div>

      </div>
    );
  }
  
  export default Banner;
  