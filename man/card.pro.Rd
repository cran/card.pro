% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/cards.R
\name{card.pro}
\alias{card.pro}
\title{Generate a flexible and extensible card container}
\usage{
card.pro(
  ...,
  title,
  collapsed = FALSE,
  width = 12,
  tabs = NULL,
  icon = NULL,
  xtra.header.content = NULL,
  footer = NULL,
  togglebtn = TRUE,
  editbtn = TRUE,
  expandbtn = TRUE,
  colorbtn = TRUE,
  removebtn = TRUE,
  sortable = TRUE,
  sidebar = NULL,
  shadow = TRUE,
  header.bg = c("white", "green", "greenDark", "greenLight", "purple", "magenta", "pink",
    "pinkDark", "blueLight", "teal", "blue", "blueDark", "darken", "yellow", "orange",
    "orangeDark", "red", "redLight"),
  alert.text = NULL,
  alert.type = c("warning", "info", "success", "danger")
)
}
\arguments{
\item{...}{The elements to include within the body of the card}

\item{title}{The text to display in the header title}

\item{collapsed}{If \code{TRUE}, the card is collapsed. The default is \code{FALSE}}

\item{width}{Select a width from 1 to 12 to indicate the size of the card}

\item{tabs}{optional. A list containing tabs items, see example}

\item{icon}{Header icon e.g. shiny::icon('fire')}

\item{xtra.header.content}{additional header content e.g. "Hi"}

\item{footer}{Footer content if any}

\item{togglebtn}{show toggle button}

\item{editbtn}{show header title edit button}

\item{expandbtn}{show card expand button}

\item{colorbtn}{show header color chooser}

\item{removebtn}{show card closer button}

\item{sortable}{If \code{FALSE}, the card will not be draggable}

\item{sidebar}{optional. include side bar content}

\item{shadow}{logical. add shadow to the card exterior}

\item{header.bg}{Header background color style}

\item{alert.text}{Enter text for the alert portion. Leave as NULL to exclude the alert}

\item{alert.type}{Indicate the type of alert to include, choices are "warning", "info", "success", "danger"}
}
\value{
HTML code of the container with a class called card.pro that holds the items
}
\description{
Widely used card component from Bootstrap with improvements to improve utility
}
\note{
For more information on the features of the card, visit the examples section of the help documentation
}
\examples{

# Example 1
if (interactive()) {
  library(shiny)
  library(card.pro)

  shiny::shinyApp(
    ui = fluidPage(
      titlePanel("Change customizations.
      Its preserved across refresh!"),
      moveable(
        card.pro(
          "Lorem ipsum odor amet.",
          title = "Box 1",
          icon = icon("fire"),
          tabs = list(
            tabEntry(
              "Tab 1",
              textInput("nor1", "Enter name"),
              "Content for 1"
            ),
            tabEntry(
              "Tab 2",
              actionButton("nor1", "Try click"),
              "sample"
            )
          )
        ),
        card.pro(
          "Another something",
          title = "Box 2",
          width = 6,
          header.bg = "blue",
          alert.text = "Its an alert!",
          colorbtn = FALSE,
          editbtn = FALSE
        )
      )
    ),
    server = empty.server
  )
}

# Example 2
if (interactive()) {
  library(shiny)
  library(card.pro)

  shiny::shinyApp(
    ui = fluidPage(
      titlePanel("Change order and refresh"),
      wrapper(
        moveable(
          card.pro(
            "A plot for test",
            textInput("test6", "Plot title"),
            actionButton("test9", "Make plot"),
            title = "Box 3",
            width = 6,
            header.bg = "red",
            collapsed = TRUE,
            sortable = FALSE
          ),
          card.pro(
            "Box 4 content",
            "shinyappstore.com",
            title = "Box 1",
            width = 8,
            header.bg = "red",
            sidebar = div(
              "My settings",
              textInput("test2", "Input change"),
              actionButton("test3", "Click to save")
            )
          )
        )
      )
    ),
    server = empty.server
  )
}

}
