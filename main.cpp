#include <windows.h>
#include <string>

// Ukuran Jendela
const int WINDOW_WIDTH = 1024;
const int WINDOW_HEIGHT = 768;

// Fungsi untuk menggambar tombol custom (TANPA native button)
void DrawCustomButton(HDC hdc, int x, int y, int width, int height, const char* text, bool isHovered) {
    // Gambar border kotak
    HPEN hPen = CreatePen(PS_SOLID, 1, RGB(150, 150, 150));
    // Jika di-hover, warnanya biru muda, jika tidak abu-abu
    HBRUSH hBrush = CreateSolidBrush(isHovered ? RGB(200, 220, 255) : RGB(240, 240, 240));
    
    SelectObject(hdc, hPen);
    SelectObject(hdc, hBrush);
    
    // Menggambar kotak tombol murni menggunakan GDI
    Rectangle(hdc, x, y, x + width, y + height);
    
    // Menggambar teks di tengah tombol
    SetBkMode(hdc, TRANSPARENT);
    SetTextColor(hdc, RGB(0, 0, 0));
    TextOutA(hdc, x + 10, y + (height / 2) - 8, text, strlen(text));
    
    DeleteObject(hPen);
    DeleteObject(hBrush);
}

// Fungsi utama untuk menggambar seluruh UI Explorer murni dengan garis dan kotak
void DrawExplorer(HDC hdc) {
    // 1. Background utama (Putih)
    RECT bgRect = {0, 0, WINDOW_WIDTH, WINDOW_HEIGHT};
    HBRUSH hBgBrush = CreateSolidBrush(RGB(255, 255, 255));
    FillRect(hdc, &bgRect, hBgBrush);
    DeleteObject(hBgBrush);

    // 2. Title Bar Custom (Biru ala Windows 7)
    RECT titleRect = {0, 0, WINDOW_WIDTH, 30};
    HBRUSH hTitleBrush = CreateSolidBrush(RGB(150, 180, 220));
    FillRect(hdc, &titleRect, hTitleBrush);
    DeleteObject(hTitleBrush);
    SetBkMode(hdc, TRANSPARENT);
    SetTextColor(hdc, RGB(255, 255, 255));
    TextOutA(hdc, 10, 8, "Computer - Custom Retro Explorer", 32);

    // 3. Toolbar Area (Atas)
    RECT toolRect = {0, 30, WINDOW_WIDTH, 70};
    HBRUSH hToolBrush = CreateSolidBrush(RGB(245, 245, 245));
    FillRect(hdc, &toolRect, hToolBrush);
    DeleteObject(hToolBrush);
    
    // Gambar custom button untuk toolbar (Bukan Native Button Win32!)
    DrawCustomButton(hdc, 10, 35, 80, 25, "<- Back", false);
    DrawCustomButton(hdc, 100, 35, 80, 25, "Forward ->", false);
    DrawCustomButton(hdc, 190, 35, 500, 25, "C:\\Windows\\System32", false); // Address bar tiruan

    // 4. Navigation Pane (Kiri)
    RECT navRect = {0, 70, 200, WINDOW_HEIGHT};
    HBRUSH hNavBrush = CreateSolidBrush(RGB(240, 245, 255));
    FillRect(hdc, &navRect, hNavBrush);
    DeleteObject(hNavBrush);
    
    SetTextColor(hdc, RGB(0, 0, 0));
    TextOutA(hdc, 10, 80, "Favorites", 9);
    TextOutA(hdc, 10, 110, "Libraries", 9);
    TextOutA(hdc, 10, 140, "Computer", 8);
    TextOutA(hdc, 30, 160, "Local Disk (C:)", 15);
    TextOutA(hdc, 30, 180, "Data (D:)", 9);
    TextOutA(hdc, 10, 210, "Network", 7);

    // 5. Main Content Pane (Kanan - Daftar File)
    // Header tabel
    TextOutA(hdc, 220, 80, "Name", 4);
    TextOutA(hdc, 450, 80, "Date modified", 13);
    TextOutA(hdc, 650, 80, "Type", 4);
    
    // Garis pemisah header
    HPEN hLinePen = CreatePen(PS_SOLID, 1, RGB(200, 200, 200));
    SelectObject(hdc, hLinePen);
    MoveToEx(hdc, 210, 100, NULL);
    LineTo(hdc, WINDOW_WIDTH - 20, 100);
    DeleteObject(hLinePen);

    // Daftar File (Hardcoded sementara)
    TextOutA(hdc, 220, 110, "Program Files", 13);
    TextOutA(hdc, 450, 110, "10/10/2023", 10);
    TextOutA(hdc, 650, 110, "File folder", 11);

    TextOutA(hdc, 220, 140, "Windows", 7);
    TextOutA(hdc, 450, 140, "11/11/2023", 10);
    TextOutA(hdc, 650, 140, "File folder", 11);
    
    TextOutA(hdc, 220, 170, "explorer.exe", 12);
    TextOutA(hdc, 450, 170, "12/12/2023", 10);
    TextOutA(hdc, 650, 170, "Application", 11);
}

// Window Procedure untuk menangani event
LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_PAINT: {
            PAINTSTRUCT ps;
            // BeginPaint menyiapkan Device Context (HDC) untuk menggambar GDI
            HDC hdc = BeginPaint(hwnd, &ps);
            
            DrawExplorer(hdc);
            
            EndPaint(hwnd, &ps);
            return 0;
        }
        case WM_DESTROY:
            PostQuitMessage(0);
            return 0;
            
        // TODO: Tambahkan WM_LBUTTONDOWN untuk mendeteksi klik mouse (X dan Y)
        // TODO: Tambahkan WM_MOUSEMOVE untuk efek hover tombol
    }
    return DefWindowProc(hwnd, uMsg, wParam, lParam);
}

// Fungsi utama Win32
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    const char CLASS_NAME[]  = "RetroExplorerClass";
    
    WNDCLASS wc = {0};
    wc.lpfnWndProc   = WindowProc;
    wc.hInstance     = hInstance;
    wc.lpszClassName = CLASS_NAME;
    wc.hCursor       = LoadCursor(NULL, IDC_ARROW);
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW+1);

    RegisterClass(&wc);

    // Membuat jendela murni tanpa komponen kontrol bawaan
    HWND hwnd = CreateWindowEx(
        0,                              
        CLASS_NAME,                     
        "Tubes Grafkom - Retro Explorer GDI",    
        WS_OVERLAPPEDWINDOW,            
        CW_USEDEFAULT, CW_USEDEFAULT, WINDOW_WIDTH, WINDOW_HEIGHT,
        NULL,       
        NULL,       
        hInstance,  
        NULL        
    );

    if (hwnd == NULL) {
        return 0;
    }

    ShowWindow(hwnd, nCmdShow);

    // Event Loop
    MSG msg = {0};
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return 0;
}
