/// <reference types = 'Cypress'/>

class HomePageElements{
    //user_avatar = () => {return ".qa-user-avatar"};
    user_avatar = () => {return "[class = 'header-user-dropdown-toggle']"};
    
    sign_out_option = () => {return '[data-qa-selector="sign_out_link"]'};

    project_name = () => {return '[id = "blank-project-pane"] [id = "project_name"]'};

    project_description = () => {return '[id = "blank-project-pane"] [id = "project_description"]'};

    init_with_read_me = () => {return '[id = "blank-project-pane"] [data-track-property= "init_with_readme"]'};

    create_project_button = ()=> {return '[id = "blank-project-pane"] [data-track-property= "create_project"]'};

    project_created_with_success_message = () =>{return 'div[class ~= "flash-notice"] > span'};

    issue_title = ()=> {return '#issue_title'};
    
    issue_description = ()=>{return '#issue_description'};

    submit_issue =() =>{return '[value = "Submit issue"]'};

    issue_created_with_success_message = ()=>{return '[class = "title qa-title"]'};
    
    edit_label = ()=>{return '.qa-edit-link-labels'};

    edit_milestone = () => {return 'a[data-track-property = "milestone"]'}
    
}   

export default HomePageElements;