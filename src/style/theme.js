import { createTheme } from '@mui/material/styles';

const sharedFontFamily =
  '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const theme = createTheme({
  typography: {
    fontFamily: sharedFontFamily,
  },

  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 4, // default radius
          '&:hover': {
            borderRadius: 8,
            backgroundColor: '#e0e0e0', // Optional hover color
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontFamily: sharedFontFamily,
          fontSize: '0.875rem',
          lineHeight: '1.5rem',
          fontWeight: 600,
          color: '#637381',
          backgroundColor: '#F4F6F8',
          borderBottom: '1px solid var(--palette-TableCell-border)',
          textAlign: 'left',
          padding: '16px',
          '& .MuiTableSortLabel-root.Mui-active': {
            color: 'black',
            fontWeight: 700,
          },
        },
        body: {
          fontFamily: sharedFontFamily,
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: 1.57143,
          display: 'table-cell',
          verticalAlign: 'inherit',
          borderBottom: '1px solid var(--palette-TableCell-border)',
          textAlign: 'left',
          padding: '16px',
        },
      },
    },

    // MuiToolbar: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiTypography-root': {
    //         fontFamily: sharedFontFamily,
    //         fontWeight: 600,
    //         fontSize: '0.875rem',
    //         lineHeight: '1.5rem',
    //         color: '#637381',
    //       },
    //       '& .MuiListItemText-root .MuiTypography-root': {
    //         fontFamily: sharedFontFamily,
    //         fontWeight: 600,
    //         fontSize: '0.875rem',
    //         lineHeight: '1.5rem',
    //         color: '#637381',
    //       },
    //       '& .MuiListItemButton-root': {
    //         fontFamily: sharedFontFamily,
    //         fontWeight: 600,
    //         fontSize: '0.875rem',
    //         lineHeight: '1.5rem',
    //         color: '#637381',
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;



// import { createTheme } from '@mui/material/styles';

// const sharedFontFamily =
//   '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// const theme = createTheme({
//   typography: {
//     fontFamily: sharedFontFamily,
//   },

//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontFamily: sharedFontFamily,
//           fontSize: '0.875rem',
//           lineHeight: '1.5rem',
//           fontWeight: 600,
//           color: '#637381',
//           backgroundColor: '#F4F6F8',
//           borderBottom: '1px solid var(--palette-TableCell-border)',
//           textAlign: 'left',
//           padding: '16px',
//           '& .MuiTableSortLabel-root.Mui-active': {
//             color: 'black',
//             fontWeight: 700,
//           },
//         },
//         body: {
//           fontFamily: sharedFontFamily,
//           fontWeight: 400,
//           fontSize: '0.875rem',
//           lineHeight: 1.57143,
//           display: 'table-cell',
//           verticalAlign: 'inherit',
//           borderBottom: '1px solid var(--palette-TableCell-border)',
//           textAlign: 'left',
//           padding: '16px',
//         },
//       },
//     },

//     // ✅ This part makes your Toolbar title match the Table Header font
//     MuiToolbar: {
//       styleOverrides: {
//         root: {
//           '& .MuiTypography-root': {
//             fontFamily: sharedFontFamily,
//             fontSize: '0.875rem',
//             lineHeight: '1.5rem',
//             fontWeight: 600,
//             color: '#637381',
//             backgroundColor: '#F4F6F8',
//             borderBottom: '1px solid var(--palette-TableCell-border)',
//             textAlign: 'left',
//             padding: '16px',
//             // fontFamily: sharedFontFamily,
//             // fontWeight: 600,
//             // fontSize: '0.875rem', // match TableCell.head
//             // lineHeight: '1.5rem',
//             // textTransform: 'none',
//             // color: '#637381',
//           },
//         },
//       },
//     },
//   },
// });

// export default theme;


// // import { createTheme } from '@mui/material/styles';

// // const theme = createTheme({
// //     typography: {
// //         fontFamily: '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
// //     },

// //   components: {
// //     MuiTableCell: {
// //       styleOverrides: {
// //         head: {
// //           fontFamily: '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
// //           fontSize: '0.875rem',
// //           lineHeight: '1.5rem',
// //           fontWeight: 600,
// //           color: '#637381',
// //           backgroundColor: '#F4F6F8',
// //           borderBottom: '1px solid var(--palette-TableCell-border)',
// //           textAlign: 'left',
// //           padding: '16px',
// //           '& .MuiTableSortLabel-root.Mui-active': {
// //             color: 'black',
// //             fontWeight: 700,
// //           },
// //         },
// //         body: {

// //         fontFamily: '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
// //           fontWeight: 400,
// //           fontSize: '0.875rem',
// //           lineHeight: 1.57143,
// //           display: 'table-cell',
// //           verticalAlign: 'inherit',
// //           borderBottom: '1px solid var(--palette-TableCell-border)',
// //           textAlign: 'left',
// //           padding: '16px',
// //         //   letterSpacing: '0.25px', // 👈 Add this line

// //         //   color: 'var(--palette-text-primary)',

// //         //   fontFamily: '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
// //         //   fontWeight: 400,
// //         //   fontSize: '0.875rem',
// //         //   lineHeight: 1.57143,
// //         //   display: 'table-cell',
// //         //   verticalAlign: 'inherit',
// //         //   borderBottom: '1px solid FFFFFF',
// //         //   textAlign: 'left',
// //         //   padding: '16px',
// //         //   color: '#212B36', // or use '#212B36'
// //         },
// //       },
// //     },
// //   },
// // });

// // export default theme;



// // // import { createTheme } from '@mui/material/styles';

// // // const theme = createTheme({
// // //   components: {
// // //     MuiTableCell: {
// // //       styleOverrides: {
// // //         head: {
// // //           fontFamily: '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
// // //           fontSize: '0.875rem',
// // //           lineHeight: '1.5rem',
// // //           fontWeight: 600,
// // //           color: '#637381',
// // //           backgroundColor: 'transparent',
// // //           textAlign: 'left',
// // //           borderBottom: '1px solid var(--palette-TableCell-border)',
// // //           padding: '16px',
// // //           '& .MuiTableSortLabel-root.Mui-active': {
// // //             color: 'black',
// // //             fontWeight: 700,
// // //           },
// // //         },
// // //         body: {
// // //           fontFamily: '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
// // //           fontWeight: 400,
// // //           fontSize: '1rem', // 16px
// // //           lineHeight: 1.5,
// // //           color: 'var(--palette-text-primary)', // You can replace this with a hex if needed
// // //           margin: 0,
// // //         },
// // //       },
// // //     },
// // //   },
// // // });

// // // export default theme;



// // // // import { createTheme } from '@mui/material/styles';
// // // // import typography from './typography';

// // // // const theme = createTheme({
// // // //   typography,
// // // //   components: {
// // // //     MuiTableCell: {
// // // //       styleOverrides: {
// // // //         head: {
// // // //           fontFamily: '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
// // // //           fontSize: '0.875rem', // ~14px
// // // //           lineHeight: '1.5rem',
// // // //           fontWeight: 600,
// // // //           color: '#637381',
// // // //           backgroundColor: 'transparent',
// // // //           textAlign: 'left',
// // // //           borderBottom: '1px solid var(--palette-TableCell-border)',
// // // //           padding: '16px',
// // // //           transition: 'color 0.2s ease-in-out',
// // // //         },
// // // //       },
// // // //     },
// // // //   },
// // // // });

// // // // export default theme;


// // // // // import { createTheme } from '@mui/material/styles';
// // // // // import typography from './typography';

// // // // // const theme = createTheme({
// // // // //   typography,
// // // // //   // You can also add palette, components, spacing here
// // // // // });

// // // // // export default theme;
