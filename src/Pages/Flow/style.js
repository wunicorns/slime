const drawerWidth = 320;

export default (theme) => ({

    root: {
        display: "flex"
        , height: "100%"
    }
    ,
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth
    }
    ,
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 3
    }
    , sideList: {
        width:' 250px'
    }
    , listContainer: {
        width: '100%'
        ,height: '100%'
    }
    , listItemCanvas: {
        width: '85%'
        , height: '100%'
    }
    , listItem: {
        maxWidth: '250px'
        , height: '100%'
    }

});