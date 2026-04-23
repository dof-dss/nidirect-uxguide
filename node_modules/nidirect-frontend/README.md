# Guidance for installing the nidirect-frontend node package manager (npm) package
- For more information on npm, read the node.js article, [What is npm?](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/)

##  Before you install the nidirect-frontend package
You will need to:
- Install [node.js](https://nodejs.org/en/)
- Install [govuk-frontend npm package version 5.0.0](https://www.npmjs.com/package/govuk-frontend/v/5.0.0) or above.  
  For guidance on how to do this, visit the [GOV.UK frontend website](https://frontend.design-system.service.gov.uk/installing-with-npm/#requirements).
- Install a SASS compiler to generate the CSS code for both packages.  
  Most popular integrated development environments (IDE) support plugins or extensions that allow you to compile SASS easily. Or if you prefer, you can compile the SASS manually using the command line.

## Installing the nidirect-frontend package
1. Open a command line window
2. Navigate to root folder of your application using the change directory command `cd` followed by the path to the root folder of your application.   

   For example: `cd user/documents/myapplication`  

3. Within your application's root folder, install the npm package using the command:

   `npm i nidirect-frontend`
  
4. When the installation finishes, the nidirect-frontend package will be in the same folder that govuk-frontend package is held.
  
## Implementing the code in your project
1. Check that both the govuk-frontend and nidirect-frontend packages are in your project folder
2. Use a SASS compiler with the file `nidirect-all.scss` to generate the CSS code for both packages.
