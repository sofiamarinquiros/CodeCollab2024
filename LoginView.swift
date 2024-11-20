import SwiftUI

struct LoginView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var message = ""

    var body: some View {
        VStack(spacing: 20) {
            Text("Login")
                .font(.largeTitle)
                .bold()
                .padding(.bottom, 20)

            TextField("Email", text: $email)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .keyboardType(.emailAddress)
                .autocapitalization(.none)

            SecureField("Password", text: $password)
                .textFieldStyle(RoundedBorderTextFieldStyle())

            Button("Login") {
                login()
            }
            .padding()
            .foregroundColor(.white)
            .background(Color.blue)
            .cornerRadius(8)

            if !message.isEmpty {
                Text(message)
                    .foregroundColor(.red)
            }
        }
        .padding()
    }

    func login() {
        if email.isEmpty || password.isEmpty {
            message = "Please fill in all fields."
        } else if email == "user@example.com" && password == "password123" {
            message = "Login successful!"
        } else {
            message = "Invalid email or password."
        }
    }
}

#Preview {
    LoginView()
}

