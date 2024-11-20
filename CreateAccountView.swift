import SwiftUI

struct CreateAccountView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var message = ""

    var body: some View {
        VStack(spacing: 20) {
            Text("Create Account")
                .font(.largeTitle)
                .bold()
                .padding(.bottom, 20)

            TextField("Email", text: $email)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .keyboardType(.emailAddress)
                .autocapitalization(.none)

            SecureField("Password", text: $password)
                .textFieldStyle(RoundedBorderTextFieldStyle())

            SecureField("Confirm Password", text: $confirmPassword)
                .textFieldStyle(RoundedBorderTextFieldStyle())

            Button("Create Account") {
                createAccount()
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

    func createAccount() {
        if password != confirmPassword {
            message = "Passwords do not match."
        } else {
            message = "Account created successfully!"
        }
    }
}

#Preview {
    CreateAccountView()
}
