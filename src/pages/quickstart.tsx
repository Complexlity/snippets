import React from "react"
import { useQuery } from "react-query"
import axios from "redaxios"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Snippet } from "fake-snippets-api/lib/db/schema"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypeBadge } from "@/components/TypeBadge"

export const QuickstartPage = () => {
  const { data: mySnippets, isLoading } = useQuery<Snippet[]>(
    "userSnippets",
    async () => {
      const currentUser = "seveibar"
      const response = await axios.get(
        `/api/snippets/list?author_name=${currentUser}`,
      )
      return response.data.snippets
    },
  )

  const blankTemplates = [
    { name: "Blank Circuit Board", type: "board" },
    { name: "Blank Circuit Module", type: "package" },
    { name: "Blank 3D Model", type: "model" },
    { name: "Blank Footprint", type: "footprint" },
  ]

  const templates = [{ name: "Blinking LED Board", type: "board" }]

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Snippets</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {mySnippets?.slice(0, 6).map((snippet) => (
                <Link
                  key={snippet.snippet_id}
                  href={`/editor?snippet_id=${snippet.snippet_id}`}
                >
                  <Card className="hover:shadow-md transition-shadow rounded-md">
                    <CardHeader className="pb-0 p-4">
                      <CardTitle className="text-md">
                        {snippet.snippet_name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500">
                        Last edited:{" "}
                        {new Date(snippet.updated_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Start Blank Snippet</h2>
          <div className="grid grid-cols-4 gap-4">
            {blankTemplates.map((template, index) => (
              <Link
                key={index}
                href={`/editor?template=${template.name.toLowerCase().replace(/ /g, "-")}`}
              >
                <Card className="hover:shadow-md transition-shadow rounded-md h-full flex flex-col">
                  <CardHeader className="p-4 flex-grow flex flex-col justify-between">
                    <CardTitle className="text-md">{template.name}</CardTitle>
                    <div className="mt-2 flex">
                      <TypeBadge type={template.type as any} />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Import as Snippet</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "KiCad Footprint", type: "footprint" },
              { name: "KiCad Project", type: "board" },
              { name: "KiCad Module", type: "package" },
            ].map((template, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow rounded-md"
              >
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {template.name}
                    <TypeBadge type={template.type as any} className="ml-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Button className="w-full">Import {template.name}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 mt-12">
            Start from a Template
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <Link
                key={index}
                href={`/editor?template=${template.name.toLowerCase().replace(/ /g, "-")}`}
              >
                <Card className="hover:shadow-md transition-shadow rounded-md">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {template.name}
                      <TypeBadge type={template.type as any} className="ml-2" />
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
