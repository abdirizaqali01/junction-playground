// app/api/proxy/[...path]/route.js
export async function GET(request, { params }) {
    try {
      const { path } = params
      const apiPath = Array.isArray(path) ? path.join('/') : path
      const apiUrl = `http://20.238.18.125:8000/${apiPath}`
      
      // Get query parameters from the request
      const url = new URL(request.url)
      const queryParams = url.searchParams.toString()
      const fullUrl = queryParams ? `${apiUrl}?${queryParams}` : apiUrl
      
      console.log('Proxying GET request to:', fullUrl)
      
      const response = await fetch(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      return Response.json(data, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    } catch (error) {
      console.error('API Proxy Error:', error)
      return Response.json(
        { error: 'Failed to fetch data', details: error.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }
  }
  
  export async function POST(request, { params }) {
    try {
      const { path } = params
      const apiPath = Array.isArray(path) ? path.join('/') : path
      const apiUrl = `http://20.238.18.125:8000/${apiPath}`
      
      const body = await request.json()
      
      console.log('Proxying POST request to:', apiUrl)
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      return Response.json(data, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    } catch (error) {
      console.error('API Proxy Error:', error)
      return Response.json(
        { error: 'Failed to create data', details: error.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }
  }
  
  export async function PUT(request, { params }) {
    try {
      const { path } = params
      const apiPath = Array.isArray(path) ? path.join('/') : path
      const apiUrl = `http://20.238.18.125:8000/${apiPath}`
      
      const body = await request.json()
      
      console.log('Proxying PUT request to:', apiUrl)
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      return Response.json(data, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    } catch (error) {
      console.error('API Proxy Error:', error)
      return Response.json(
        { error: 'Failed to update data', details: error.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }
  }
  
  export async function DELETE(request, { params }) {
    try {
      const { path } = params
      const apiPath = Array.isArray(path) ? path.join('/') : path
      const apiUrl = `http://20.238.18.125:8000/${apiPath}`
      
      console.log('Proxying DELETE request to:', apiUrl)
      
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      return Response.json(data, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    } catch (error) {
      console.error('API Proxy Error:', error)
      return Response.json(
        { error: 'Failed to delete data', details: error.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }
  }
  
  export async function OPTIONS() {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }