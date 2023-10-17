const Banner = () => {
    return (
      <div className="h-full bg-gray-900 text-white p-4">
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
          */}
        <div className="container mx-auto flex flex-row justify-between"> 
          {/* 
            2.1 Contributor Info Section 
                Flex-Col   : 'flex flex-col' enables flex layout and arranges children in a column.
                Alignment  : 'items-start' aligns the flex items to the start of the container.
                2.1.1 span
                    Text Style: 'text-lg font-semibold mb-2' sets the text size to large, makes it 
                                semi-bold and adds a margin-bottom of 2 units.
            */}
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold mb-2">Contributors:</span>
            <a href="#" className="mb-1">Person 1</a>
            <a href="#" className="mb-1">Person 2</a>
            {/* Add more here */}
          </div>
          
          {/* 
            2.2 Source Code Info Section 
                Flex-Col   : 'flex flex-col' enables flex layout and arranges children in a column.
                Alignment  : 'items-start' aligns the flex items to the start of the container.
                2.2.1 span
                    Text Style: 'text-lg font-semibold mb-2' sets the text size to large, makes it 
                                semi-bold and adds a margin-bottom of 2 units.
            */}
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold mb-2">Source Code:</span>
            <a href="#" className="mb-1">GitHub Link</a>
          </div>
  
          {/* 
            2.3 GIF Link Section 
                Flex-Col   : 'flex flex-col' enables flex layout and arranges children in a column.
                Alignment  : 'items-start' aligns the flex items to the start of the container.
                2.2.1 span
                    Text Style: 'text-lg font-semibold mb-2' sets the text size to large, makes it 
                                semi-bold and adds a margin-bottom of 2 units.
            */}
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold mb-2">Demo:</span>
            <a href="#" className="mb-1">GIF Link</a>
          </div>  
        </div>

      </div>
    );
  }
  
  export default Banner;
  