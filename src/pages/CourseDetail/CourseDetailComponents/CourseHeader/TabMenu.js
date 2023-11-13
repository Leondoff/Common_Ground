import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './TabMenu.css';
import { handleAddPost, handleDeletePost, handleEditPost, } from './../../../../services/Apis';
import CourseAccordion from './CourseAccordion';
import FileUploadForm from '../Buttons/video_and_pdf_button';
import DicussionForum from "../DicussionForum/DicussionForum";
import BasicTextFields from "../Buttons/button"
import Assignments from './Assignments';
import StudentList from './StudentList';
Dialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool,
    children: PropTypes.node,
};

function CustomAccordion(props) {
    const { index, title, pdfLink, assignmentLink, details, AssignmentTitle, pdfTitle, content, editSection, deleteSection,sectionName, sections, setSections } = props;

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(details);

   

    const handleEditSection = () => {
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        // Implement the logic to save the edited section
        // Update the section title and content as needed
        // editSection(index, editedTitle, editedDescription);
        setEditDialogOpen(false);
    };

    // const handleCancelEdit = () => {
    //     setEditDialogOpen(false);
    //     setEditedTitle(title);
    // };

    const handleDeleteSection = () => {
        // Implement the logic to delete the section
        // deleteSection(index);
    };

    const handleEditContent = (contentIndex, editedContent,editedPoatName) => {
        // Implement the logic to edit content within the section
        const updatedContent = [...content];
        updatedContent[contentIndex] = editedContent;
        editSection(index, editedTitle, editedDescription, updatedContent);
      };
    
      const handleEditPostName = (contentIndex, editedPoatName) => {
        // Implement the logic to edit content within the section
        const updatedPostName = [...postName];
        updatedPostName[contentIndex] = editedPoatName;
        editSection(index, editedTitle, editedDescription, updatedPostName);
      };
      

      const handleDeleteContent = (contentIndex) => {
        // Implement the logic to delete content within the section
        // const updatedContent = [...content];
        // updatedContent.splice(contentIndex, 1);
        // editSection(index, editedTitle, editedDescription, updatedContent);
      };
    

    return (
        <Accordion style={{ margin: '10px 0' }} className='accordion'>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

                <Typography color="primary" style={{ fontSize: '18px' }}>{title}</Typography>
                <div >
                    <Button variant="outlined" >Edit</Button>
                    <Button variant="outlined">Delete</Button>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                {content && content.map((course, courseIndex) => (
            <CourseAccordion
            key={courseIndex}
            postTitle={sectionName}
            content={course}
            pdfTitle={pdfTitle[courseIndex]}
            AssignmentTitle={AssignmentTitle[courseIndex]}
            pdfLink={pdfLink[courseIndex]}
            assignmentLink={assignmentLink[courseIndex]}
            editSection={editSection}
            deleteSection={deleteSection}
            editContent={(editedContent) => handleEditContent(courseIndex, editedContent)}
                  deleteContent={() => handleDeleteContent(courseIndex)}
            />
          ))}
                </div>
                {/* {posts} */}
                <FileUploadForm />
            </AccordionDetails>

            {/* <Dialog
                open={editDialogOpen}
                onClose={handleCancelEdit}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Edit Section</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Section Title"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <TextField
                            label="Section Description"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelEdit} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Accordion>
    );

    // return (
    //     <div>this is section</div>
    // );
}

CustomAccordion.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired, // Change 'description' to 'details'
    pdfLink: PropTypes.string.isRequired,
    assignmentLink: PropTypes.string.isRequired,
    pdfTitle: PropTypes.arrayOf(PropTypes.string),
    AssignmentTitle: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.arrayOf(PropTypes.string),
    posts: PropTypes.node,
    editSection: PropTypes.func.isRequired,
    deleteSection: PropTypes.func.isRequired,
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography color={'gray'}>
                        {children}
                        {/* Add more CustomAccordion components for different weeks */}
                    </Typography>
                </Box>

            )}
        </div>
    );
}


CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ sections, courseId }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const [sections, setSections] = useState([
    //     {
    //         title: 'Week 1',
    //         details: 'This is the details for Week 1.',
    //         pdfLink: ["link-to-pdf-1", "link-to-pdf-2"],
    //         pdfTitle: ["Matrial-1", "Matrial-2"],
    //         assignmentLink: ["link-to-assignment-1", "link-to-assignment-2"],
    //         AssignmentTitle: ["Assignment 1", "Assignment 2"],
    //         content: ['Course content goes here 1.1', 'Course content goes here 1.2'],
    //         posts: null,
    //     },
    //     {
    //         title: 'Week 2',
    //         details: 'This is the details for Week 1.',
    //         pdfLink: ["link-to-pdf-1", "link-to-pdf-2"],
    //         pdfTitle: ["Matrial-1", "Matrial-2"],
    //         assignmentLink: ["link-to-assignment-1", "link-to-assignment-2"],
    //         AssignmentTitle: ["Assignment 1", "Assignment 2"],
    //         content: ['Course content goes here 1.1', 'Course content goes here 1.2'],
    //         posts: null,
    //     },
    //     // Add more sections as needed...
    // ]);

    const students = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        // Add more students as needed
      ];

      const editSection = (index, editedTitle, editedDescription, updatedContent,newPostName) => {
        // Update the section's title, description, and content in the state
        const updatedSections = [...sections];
        updatedSections[index] = {
          ...sections[index],
          title: editedTitle,
          details: editedDescription,
          content: updatedContent,
        };
        // setSections(updatedSections); // This should update the state

    };

    const deleteSection = (index) => {
        // Delete the section from the state
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        // setSections(updatedSections);
    };

    const handleEditContent = (sectionIndex, contentIndex, editedContent) => {
        // Implement the logic to edit content within the section
        const updatedContent = [...sections[sectionIndex].content];
        updatedContent[contentIndex] = editedContent;
        editSection(sectionIndex, sections[sectionIndex].title, sections[sectionIndex].details, updatedContent);
      };

      const handleEditPostName = (sectionIndex, postIndex,newPostName) => {
        const updatedPostName = [...sections[sectionIndex].postName];
        updatedPostName[postIndex] = newPostName;
        editSection(sectionIndex, sections[sectionIndex].title, sections[sectionIndex].details,newPostName);
      };
    
      const handleDeleteContent = (sectionIndex, contentIndex) => {
        // Implement the logic to delete content within the section
        const updatedContent = [...sections[sectionIndex].content];
        updatedContent.splice(contentIndex, 1);
        editSection(sectionIndex, sections[sectionIndex].title, sections[sectionIndex].details, updatedContent);
    };
    return (


        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ backgroundColor: 'white' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ color: '#fff' }}>
                        <Tab style={{ fontSize: '18px' }} label="SECTIONS" {...a11yProps(0)} />
                        <Tab style={{ fontSize: '18px' }} label="ASSIGNMENTS" {...a11yProps(1)} />
                        <Tab style={{ fontSize: '18px' }} label="DISCUSSIONFORUM" {...a11yProps(2)} />
                        <Tab style={{fontSize: '18px' }} label="STUDENTS" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    Item One
                    {sections && sections.map((section, index) => (
                        <CustomAccordion
                            key={index}
                            index={index}
                            title={section.title}
                            // description={section.description}
                            // pdfLink={section.pdfLink}
                            // pdfTitle={section.pdfTitle}
                            // assignmentLink={section.assignmentLink}
                            // AssignmentTitle={section.AssignmentTitle}
                            // details={section.details}
                            // content={section.content}
                            // posts={section.posts}
                            // editSection={editSection}
                            // deleteSection={deleteSection}
                        />
                    ))}
                    <BasicTextFields />
                </CustomTabPanel>
                
                <CustomTabPanel value={value} index={1}>
                    Assignments
                    <Assignments
                        title={["Assigments"]}
                        assignmentLink={["link-to-assignment-1", "link-to-assignment-2"]}
                        AssignmentTitle={["Assignment 1", "Assignment 2"]}
                    />
                    <Assignments
                        title={["Assigments"]}
                        assignmentLink={["link-to-assignment-1", "link-to-assignment-2"]}
                        AssignmentTitle={["Assignment 1", "Assignment 2"]}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                    <DicussionForum />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    STUDENTS
                    <StudentList students={students} />
                </CustomTabPanel>
            </Box>
        </div>
    );
}