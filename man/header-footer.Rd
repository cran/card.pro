% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/misc.R
\name{titlePanel2}
\alias{titlePanel2}
\alias{footerPanel}
\title{Create a title and footer bar}
\usage{
titlePanel2(
  title,
  rightContent = NULL,
  windowTitle = title,
  text.col = "#2a2725",
  bg.col = "#ffffff"
)

footerPanel(
  title = shiny::HTML("&copy; 2024"),
  rightContent = NULL,
  bg.col = "#2a2725",
  text.col = "#f5f5f5"
)
}
\arguments{
\item{title}{title of the tab}

\item{rightContent}{content of the right}

\item{windowTitle}{window title}

\item{text.col}{text color}

\item{bg.col}{background color}
}
\value{
An list containing the title and content of a header or footer
}
\description{
Create an alternative title bar
}
\examples{
if (interactive()) {
titlePanel2("Main title", "Right content | About me")
titlePanel2("Main title", action)
}

if (interactive()) {
footerPanel("Main footer @ 2024. All rights reserved", "Contact us")
}

}
